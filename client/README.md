<h1 align="center">📐🗄🗂🗳📏 metric-teacher Client 📏🗳🗂🗄📐</h1>
This is the documentation for the client side of the metric-teacher project, a ReactJS + Apollo software project.

This is a project conceived and implemented completely by myself, Kyle Geib. UW Bothell educated, Seattle located SDET turned Product Support Engineer turning to eventual JavaScript Full-Stack Developer. I've been a professional programmer since 2013-01-02.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Apollo Boost](https://www.npmjs.com/package/apollo-boost).

# How to Run
## Build CSS
There is a build step required that needs an extra tool: `gulp-cli`.

Install it globally with `npm install -g gulp-cli`.

> The styling of the client uses Semantic-UI, specifically using a ReactJS Component Library [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React).

And with that all you need to do is navigate to `src/semantic` and run `gulp build`. That'll construct the `src/semantic/dist` directory and the necessary css files required to style this site. The scripts also do this for you when running start, but it'll fail unless you have gulp installed.

Alternatively, `yarn build-semantic` can do this for you.

Theming provided through [Semantic-UI-Forest.com](https://semantic-ui-forest.com/themes/).

## Build the React App
This is very easy. Run `yarn build-react` to build the React app.

Alternatively, you can build both CSS and the React app at the same time with `yarn build`.

## Deploy to Docker (Prod)
I never bothered with building to Docker containers during development, so this only shows how to build for AWS situations.

If you have a running Docker container you just need to build:

`docker-compose -f ./docker-compose.yml up -d --build`

Visit the server in your browser and the front page should appear!

# Hosting on AWS
At the time of writing I dedicate an entire AWS EC2 instance to hosting the client.

## Docker-Machine
Configuring Docker-Machines on AWS requires a bit of a set-up but makes everything possible.

From my personal notes:
1) I had docker and docker-machine already installed. Try `docker --version` and `docker-machine --version` to see if they're working.
2) I had to get AWS tokens: [Here](https://console.aws.amazon.com/iam/home#/security_credential)
3) Then I installed the AWS CLI ([instructions here](https://docs.aws.amazon.com/cli/latest/userguide/installing.html))
4) I let `aws configure` do the configuration for me as [followed here](https://docs.docker.com/machine/drivers/aws/#configuring-credentials), entering in my key and secret.
5) I then ran the create command for docker-machine as [followed here](https://docs.docker.com/machine/drivers/aws/#aws-credential-file).
6) From there I configured my docker-machine's [bash scripts](https://docs.docker.com/machine/install-machine/#install-bash-completion-scripts).
  * To do this I downloaded the bash scripts it downloads (I put them in OneDrive for safe keeping and symlinked them from /usr/local/etc/bash_completion.d/ - a directory I choose because the one under /etc was empty)
  * In my ~/.bash_profile (also symlinked to OneDrive for safe keeping) I modified my PS1 (the thing that determines the look of your prompt in bash), adding a new section: $(__docker_machine_ps1 "\[%s\]")
  * And before that PS1 line I had source commands to each .bash script
7) From there I could run a command: `docker-machine use aws01` (the name of my first aws docker-machine, example create I followed [here](https://docs.docker.com/machine/drivers/aws/#aws-credential-file)) and the notice in my PS1 would appear that I was using the remote docker-machine.
8) To return to my local docker-machine I could run the command: `docker-machine use -u` and it would unset.
9) I could see the difference by simply running `docker ps` and see which docker-machines had what on them.

### Launching Instances
Creating new instances isn't too hard. Here are the command I used:
`docker-machine create --driver amazonec2 --amazonec2-region us-west-2 --amazonec2-instance-type t2.micro --amazonec2-keypair-name myKey --amazonec2-ssh-keypath ~/.ssh/id_rsa metric-teacher-client01`

I was from the start telling AWS to associate my personal SSH key with the instance so I could immediately SSH into it. In this example in `~/.ssh` there are two files, `id_rsa` and `id_rsa.pub`. The create command assumes you have the private key as whatever name you give (example: `./myKey`) and the public key as the same file but with `.pub` (example: `./myKey.pub`).

The instance is a micro instance and named `metric-teacher-client01`

I could then switch to that machine with `docker-machine use metric-teacher-client01`

#### Elastic IP Addresses
Amazon gives every user the option to reserve 5 IPv4 addresses to assign to their instances. So I grabbed a new IP address and associated it with each new instance I wanted to use.

Then, on my DNS service I associated those IP addresses with different subdomains. In my case, metric-teacher.com & www․metric-teacher.com went to the client instance, api․metric-teacher.com went to the server instance, and db․metric-teacher.com went to the Prisma+MySQL instance.

## UP'ing Client
First, build the client with `yarn build`.

Make sure you've switched your docker-machine like so: `docker-machine use metric-teacher-client01`

Then, from `./client`, run the following command: `docker-compose -f ./docker-compose-aws-prod.yml up -d`

That'll put the client up on your instance. Assuming your ports and everything are open correctly and you've configured your DNS to point at the IP address for the instance it'll load up the welcome page.

# Traefik Reverse-Proxy Config
I'm using Traefik as a method to provide HTTPS security for the client, server, and database.

Traefik is a simple tool that routes traffic through it and works well in Docker containers. It essentially acts as a simple gatekeeper of incoming traffic. When configured a certain way, it will force HTTP traffic to HTTPS. It also has the sweet feature of providing free and automatic SSL certification through Let's Encrypt!

You can access the dashboard by visiting metric-teacher.com/traefik though it may require you to use a new browser to work due to what I assume are caching issues. There is a user name and password requirement.

## UP'ing Client with Traefik
HTTPS security is provided through [Traefik](https://traefik.io/) and Let's Encrypt. This complicates things but I tried my best to be sure that it went all as smoothly as possible.

### Nuking client
You'll first need to bring down the existing client container.

Make sure you're on the correct docker-machine with `docker-machine use metric-teacher-client01` and from `./client` run the command `docker-compose -f ./docker-compose-aws-prod.yml down` to bring it all down.

Congrats, your site is down!

### Initializing Acme
Navigate to `./client/traefik` and run the following two commands:
`sh init-acme.sh metric-teacher.com`
`sh upload-traefik.sh metric-teacher.com`

They'll create a new blank `acme.json` file on db.metric-teacher.com and upload the `traefik.toml` file I have there for configuration purposes.

The `acme.json` file is where Traefik stores your SSL cert stuff. It should be protected and preferrably backed-up (you can only get a [certain amount of certs a week](https://letsencrypt.org/docs/rate-limits/)). The `traefik.toml` file contains configuration settings for the application.

### Bring up Client
Navigate back to `./client` directory and as normal run `yarn build` to make sure that you've got the freshest client code up and built.

Run the command `docker-compose -f ./docker-compose-aws-prod-traefik.yml up -d`

### Testing
Visit the site! It might take a few visits (maybe even an incognito browser) to get the https to work, but eventually it should!
