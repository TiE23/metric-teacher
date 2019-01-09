FROM traefik:latest

COPY ./traefik.toml /traefik.toml

# Blank file with permission code 600. It needs to be copied because the Traefik image
# doesn't have a shell. So it cannot even RUN touch or chmod.
COPY ./acme.json /acme.json
