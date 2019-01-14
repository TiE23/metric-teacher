/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Image, List, Responsive } from "semantic-ui-react";

import Tables from "./DocumentationTables";
import XLink from "../misc/ExternalLink";

import {
  SITE_NAME,
  SITE_EMAIL_ADMIN,
  DOCUMENTATION_MISSION_STATEMENT,
  DOCUMENTATION_HOW_TO,
  DOCUMENTATION_TO_METRIC,
  DOCUMENTATION_FROM_METRIC,
  DOCUMENTATION_GUIDE,
  MOBILE_BREAKPOINT,
  SUBJECT_ICONS,
  QUESTION_TYPE_DROPDOWN,
} from "../../constants";

// DEV NOTE: Do not use "top" or "up" for any key name and do not name any root-level objects "all"
// or use a number. They'll cause problems in DocumentationDisplay.js!

export default {
  // Mission Statement
  missionStatement: {
    header: {
      content: "Mission Statement",
      as: "h1",
      dividing: true,
      ...DOCUMENTATION_MISSION_STATEMENT,
    },
    content: (
      <React.Fragment>
        <p>
          {SITE_NAME} is a teaching tool that will help you learn to imagine, understand, and describe objects, people, and the world using a new system of measurements.
        </p>

        <p>
          The goal of {SITE_NAME} is to allow you to eventually think in a new unit system. Like a fluent speaker of a new language isn't remembering vocabulary lists as they speak, our students won't need to remember conversion formula for the rest of their life.
        </p>

        <p>
          Whether you wish to learn the Metric System or the US Customary Unit System you will find what you need here all on one convenient, mobile-friendly website.
        </p>
      </React.Fragment>
    ),

    whyMetric: {
      header: {
        content: "Why learn the Metric System",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            The Metric System is the international standard used by 95.6% of the world's population. It is far easier to do math with because everything is easily divisible by 10s, 100s, and 1000s. To change units you can simply move the decimal point.
          </p>

          <p>
            As a US Customary Unit System user you likely <XLink to="https://en.wikipedia.org/wiki/Metrication_in_the_United_States#Current_use">do have a grasp on some parts of the Metric System</XLink>. You know about how large a 2-liter bottle is, you've read nutritional fact labels using grams, and you've seen centimeters on rulers since you were in first grade. This is enough of a base to start.
          </p>

          <p>
            The goal of {SITE_NAME} is to make the Metric System feel natural:
          </p>

          <List bulleted>
            <List.Item>
              The mind that tells you that a 95 degree Fahrenheit summer day is hot, a 25 mile per hour car is slow, and a 6 foot, 7 inch tall man is very tall...
            </List.Item>
            <List.Item>
              Will become the mind that tells you that a 35 degree Celsius summer day is hot, a 40 kilometers per hour car is slow, and a 200 centimeter tall man is very tall.
            </List.Item>
          </List>
        </React.Fragment>
      ),
    },

    whyUSCustomary: {
      header: {
        content: "Why learn the US Customary Unit System",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            If you're going to America you will encounter US Customary Units. It is an invaluable ability to know what your new coworker means when say they live about 15 miles away or what to wear when the forecast is 50 degrees Fahrenheit.
          </p>

          <p>
            While your new American neighbors may scratch their head if you use Celsius or kilograms <XLink to="https://en.wikipedia.org/wiki/Metrication_in_the_United_States#Current_use">they will be relatively familiar</XLink> with a liter water bottle, the light layer of snow that's "only a centimeter deep", and the street corner that's "about 100 meters" away.
          </p>

          <p>
            The US Customary Unit System involves a large library of units and sub units that you'll have to deal with. You'll also need to know what units to use depending on the numbers involved. As the name implies {SITE_NAME} was designed initially to teach the Metric System. But it can just as effectively work the other way around.
          </p>

          <p>
            The goal of {SITE_NAME} is to make the US Customary Unit System feel natural:
          </p>
          <List bulleted>
            <List.Item>
              The mind that tells you that a 35 degree Celsius summer day is hot, a 40 kilometers per hour car is slow, and a 200 centimeter tall man is very tall...
            </List.Item>
            <List.Item>
              Will become the mind that tells you that a 95 degree Fahrenheit summer day is hot, a 25 mile per hour car is slow, and a 6 foot, 7 inch tall man is very tall.
            </List.Item>
          </List>
        </React.Fragment>
      ),
    },
  },


  // Site Details
  howTo: {
    header: {
      content: `How To Use ${SITE_NAME}`,
      as: "h1",
      dividing: true,
      ...DOCUMENTATION_HOW_TO,
    },
    content: (
      <React.Fragment>
        <p>
          The following is a guide to the different parts of {SITE_NAME} and how to use the website effectively.
        </p>
      </React.Fragment>
    ),

    start: {
      header: {
        content: "Getting Started",
        as: "h2",
        dividing: true,
      },
      content: null,

      enroll: {
        header: {
          content: "Enrolling",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              After <Link to="/signup">signing up</Link> for an account you'll need to <b>Enroll</b>. This takes only a single click from the <Link to="/user/me">User Profile page</Link>.
            </p>
          </React.Fragment>
        ),
      },

      course: {
        header: {
          content: "Assigning a New Course",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              The next step is to assign a new <b>Course</b> to yourself. Here you will be asked for your preference: Are you more familiar with the Metric System? Or are you more familiar with the US Customary Unit system? Your preference can be changed at any time.
            </p>
          </React.Fragment>
        ),
      },

      subjects: {
        header: {
          content: "Building Your Course-load",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              Now it's time to assign <b>Sub-Subjects</b> to your course. Go to the <Link to="/subjects">Subjects page</Link> to view the various Subjects and Sub-Subjects. Assign a Sub-Subject to start seeing it available in Challenges.
            </p>

            <p>
              With each assigned Sub-Subject your Course will track your <b>Mastery</b> with each Sub-Subject. As you progress in your learning your Mastery score will increase. As your Mastery improves the questions you get will get progressively more and more difficult.
            </p>
          </React.Fragment>
        ),
      },
    },

    profile: {
      header: {
        content: "Reviewing Your Profile",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            When reviewing your <b>Masteries</b> on the <Link to="/user/me">User Profile page</Link> you can group by Subject or see each Sub-Subject individually. You can also disable any Sub-Subject you desire to remove them from Challenges, useful if you have completed or lost interest in a particular Sub-Subject. Enabling them again will restore their availability in Challenges.
          </p>

          <p>
            When reviewing your <b>Surveys</b> on the <Link to="/user/me">User Profile page</Link> you can re-answer them, adjust your note (if there is any), or disable it from appearing in Challenges.
          </p>
        </React.Fragment>
      ),
    },

    challenges: {
      header: {
        content: "Challenges",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            Challenges are the centerpiece of {SITE_NAME}. After <Link to="/signup">signing up for an account</Link> and choosing the Subjects and Sub-Subjects you're interested in on the <Link to="/subjects">Subjects page</Link> you can start a Challenge by visiting the <Link to="/challenge">Challenge page</Link>.
          </p>
        </React.Fragment>
      ),

      starting: {
        header: {
          content: "Starting a Challenge",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              On the Challenge "<b>Kickoff</b>" page you'll have options to select what Subjects you want to practice on. We recommend concentrating on one Subject at a time until you're comfortable with it and to practice both "To Metric" and "From Metric" together.
            </p>

            <p>
              The <b>length</b> of a Challenge is always up to you. Your progress is tracked by how many correct answers you make. Additionally, you can select "<b>ignore difficulty</b>" which will show all questions regardless of your Mastery in any particular Sub-Subject.
            </p>
          </React.Fragment>
        ),
      },

      questionTypes: {
        header: {
          content: "Question Types",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              Challenges use three different types of questions to help you learn.
            </p>

            <Grid>
              <Grid.Row centered columns="equal" divided>
                <Grid.Column>
                  <Image src="/img/challenge/m-written.gif" size="small" rounded centered />
                  <Header textAlign="center">Written</Header>
                </Grid.Column>
                <Grid.Column>
                  <Image src="/img/challenge/m-conversion.gif" size="small" rounded centered />
                  <Header textAlign="center">Conversion</Header>
                </Grid.Column>
                <Grid.Column>
                  <Image src="/img/challenge/m-survey.gif" size="small" rounded centered />
                  <Header textAlign="center">Survey</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <List>
              <List.Item>
                <List.Icon name={QUESTION_TYPE_DROPDOWN[0].icon} />
                <List.Content>
                  <b>Written</b> questions are multiple choice and never change.
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name={QUESTION_TYPE_DROPDOWN[1].icon} />
                <List.Content>
                  <b>Conversion</b> questions are dynamically generated and have three methods to answer: multiple choice, slider, or direct input.
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name={QUESTION_TYPE_DROPDOWN[2].icon} />
                <List.Content>
                  <b>Survey</b> questions are like Conversion questions but the answers are defined by you! This way you'll learn things like how tall you are in a new unit.
                </List.Content>
              </List.Item>
            </List>
          </React.Fragment>
        ),
      },

      taking: {
        header: {
          content: "Taking a Challenge",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              As you gain Mastery in a Sub-Subject the <b>difficulty</b> of the questions you face will increase. The easiest questions are not meant to challenge, only to introduce you to the basics.
            </p>

            <p>
              <b>Progress</b> in a challenge is shown on the horizontal bar between the question and answer sections of the Challenge screen.
            </p>

            <p>
              <b>Skipping</b> questions is always an option. It works best if you only skip the question after trying to answer the first time.
            </p>

            <p>
              <b>Input</b> methods vary. Depending on the type of question you'll have different methods of answering.
            </p>

            <List bulleted>
              <List.Item>
                <b>Multiple choice</b> presents you with multiple choices where only one choice is the correct one.
              </List.Item>
              <List.Item>
                <b>Direct input</b> presents you with a calculator-like interface that allows you to input a value directly.
              </List.Item>
              <List.Item>
                <b>Slider input</b> presents you with a easy-to-use slider that will provide you with a suggested range of input.
              </List.Item>
            </List>

            <p>
              <b>Correct answers</b> are required to improve your Mastery.
            </p>

            <p>
              <b>Incorrect answers</b> are inevitable and you'll sometimes get help with a reminder of your last answer or a greyed-out wrong multiple choice answer. But answer incorrectly too many times and you'll fail the question.
            </p>

            <p>
              <b>Pausing</b> a Challenge is possible. If you're interrupted you can return to the same URL and you'll resume from where you left.
            </p>
          </React.Fragment>
        ),
      },

      help: {
        header: {
          content: "Getting Help",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              <b>Documentation</b> is always available in Challenges. Below the question there is a small teal colored link with a <Icon name="book" color="teal" fitted /> that you can click on to see a description, conversion chart, and tips on how to convert to the units you're working on.
            </p>
          </React.Fragment>
        ),
      },

      feedback: {
        header: {
          content: "Giving Feedback",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              <b>Feedback</b> is encouraged and helps {SITE_NAME}. Click <Icon name="paper plane" color="teal" fitted /> to give feedback on the current question. Send in suggestions, corrections, or complaints - they all help.
            </p>
          </React.Fragment>
        ),
      },

      surveys: {
        header: {
          content: "Filling Surveys",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              <b>Surveys</b> are special questions that first ask you to input your own value. It then becomes a specially personalized question for you to answer in your next Challenge.
            </p>

            <p>
              You can <b>Skip</b> answering a survey with <u>no penalty</u> towards your Mastery. Alternatively, if you want to answer a question later you can click "Ask Me Later".
            </p>

            <p>
              Some Surveys have the option or require filling in a <b>Note</b>. If it asks you, for example, how tall the last person you spoke to is, it would make sense to write that person's name down.
            </p>
          </React.Fragment>
        ),
      },

      completing: {
        header: {
          content: "Completing a Challenge",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              When you've completed a Challenge you'll reach the <b>Challenge Complete</b> page. Click the submit button to see how you did!
            </p>

            <p>
              If for any reason you lose connection to the Internet you can safely refresh this page and try to submit your results again when you've regained connection.
            </p>

            <p>
              The <b>score page</b> will show you your Mastery progress for each Sub-Subject you've practiced against. It will also show progress on Survey questions and your responses to any new Survey questions you've faced.
            </p>
          </React.Fragment>
        ),
      },
    },

    contribute: {
      header: {
        content: `Contributing to ${SITE_NAME}`,
        as: "h2",
      },

      feedback: {
        header: {
          content: "Giving Feedback",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              <b>Feedback</b> is encouraged and helps {SITE_NAME}. Click <Icon name="paper plane" color="teal" fitted /> to give feedback on the current question when in Challenge Mode. Send in suggestions, corrections, or complaints - they all help.
            </p>
          </React.Fragment>
        ),
      },

      questions: {
        header: {
          content: "Question Creator",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              If you'd like to help make {SITE_NAME} better you can contribute by writing your own questions. Visit the <Link to="/tools">Community Tools</Link> page and use the <b>Question Creator</b>.
            </p>

            <p>
              Choose your question's type and difficulty, subject, scale, and finally direction. From there compose your own question and submit it to be reviewed. You will not be able to edit your question after submission but if you made one little typo or picked the wrong difficulty do not worry, we'll adjust it as needed.
            </p>

            <p>
              From there you can look at your past contributions and see which were approved, which were rejected, and which are still awaiting review. Please note that if you are found to be abusing the question creation system your privileges can be revoked or your account terminated.
            </p>
          </React.Fragment>
        ),
      },

      contact: {
        header: {
          content: "Contact Us",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              If you have comments, requests, bug reports, or you forgot your password you can e-mail us at <a href={`mailto:${SITE_EMAIL_ADMIN}`}>{SITE_EMAIL_ADMIN}</a> and we'll be sure to try and help you out any way we can!
            </p>
          </React.Fragment>
        ),
      },
    },
  },

  // Metric Details
  metric: {
    header: {
      content: "The Metric Perspective",
      as: "h1",
      dividing: true,
      ...DOCUMENTATION_TO_METRIC,
    },
    content: (
      <React.Fragment>
        <p>
          The <XLink to="https://en.wikipedia.org/wiki/History_of_the_metric_system">history</XLink> of <XLink to="https://en.wikipedia.org/wiki/Metric_system">the Metric System</XLink> traces its development to the time of the French Revolution in the 1790s. It was proposed as a new standard to solve the problem of a world full of confusing measurement systems.
        </p>

        <p>
          The Metric System started with <XLink to="https://en.wikipedia.org/wiki/History_of_the_metre">the definition of the meter</XLink>. Through surveying, the meter was defined to be one ten-millionth of the distance between the North Pole and the Equator intersecting through Paris. Future surveys discovered slight inaccuracies to their measurements but the meter's physical dimension was kept.
        </p>

        <p>
           Length was squared for area, cubed for volume, and divided by time for velocity. Mass was defined as the weight of water, a universally available physical medium, at a certain temperature and pressure.
        </p>

        <p>
          The key to the Metric System's success was the use of the decimal unit system; dropping fractions for decimal numbers simplified conversions between similar units. In addition adopting Greek and Latin-roots helped give the names a universal quality.
        </p>

        <p>
          Over time the units were redefined with new physical prototypes and the system was further developed into the <b>International System of Units</b> which is abbreviated as <b>SI</b> from the French <i>Système international (d'unités)</i>. SI is the modern form of the Metric System, but referring to it as the "Metric System" is still perfectly reasonable in almost all circumstances outside a metrologist's workshop. Even with these updates the units defined in the late 18th century have remained effectively the same for over 200 years.
        </p>
      </React.Fragment>
    ),

    spelling: {
      header: {
        content: "Metric Unit Spelling",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            As this website was developed by Americans primarily for Americans. So American spellings (meter, gram, liter, etc...) for Metric unit names are used throughout this website as opposed to British or French spellings (metre, gramme, litre, etc...).
          </p>

          <p>
            If is also worth sharing, for our American audience, the fact that <b>decimal points</b> may actually be <b>commas</b> <XLink to="https://en.wikipedia.org/wiki/Decimal_separator#Arabic_numerals">in many countries</XLink>. The number 10.25 in America would be written as 10,25 in France, Germany, and many other countries. There is also further <XLink to="https://en.wikipedia.org/wiki/Decimal_separator#Examples_of_use">variation with thousands seperators</XLink>. {SITE_NAME} uses the American style of decimal points and commas for thousands seperators.
          </p>
        </React.Fragment>
      ),
    },

    prefixes: {
      header: {
        content: "Metric Prefixes",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            This is not a <XLink to="https://en.wikipedia.org/wiki/Metric_prefix">full list</XLink> of all prefixes in existence and not all prefixes shown here are even covered by {SITE_NAME}. Almost all work will be limited to kilo, centi, and milli prefixes.
          </p>

          {Tables.metricPrefixes}
        </React.Fragment>
      ),
    },
  },


  // US Customary Details
  uscustomary: {
    header: {
      content: "The US Customary Unit Perspective",
      as: "h1",
      dividing: true,
      ...DOCUMENTATION_FROM_METRIC,
    },
    content: (
      <React.Fragment>
        <p>
          {SITE_NAME} uses the <XLink to="https://en.wikipedia.org/wiki/United_States_customary_units">US Customary System</XLink> (USCS). Based off earlier British units, it is a sibling to the <XLink to="https://en.wikipedia.org/wiki/Imperial_units">Imperial Unit System</XLink> which was <XLink to="https://en.wikipedia.org/wiki/Weights_and_Measures_Acts_(UK)">standardized in 1894</XLink>, decades after the United States declared independence from the British Empire. The functional <XLink to="https://en.wikipedia.org/wiki/Comparison_of_the_imperial_and_US_customary_measurement_systems">differences</XLink> are limited to <u>liquid</u> volume units.
        </p>

        <p>
          Fahrenheit, it is worth mentioning, isn't an Imperial unit. It was first defined by a Dutch-German-Polish physicist in 1724 and gained acceptance over the following decades following a final adjustment in definition in 1776 by Henry Cavendish, a British scientist. On the other hand, <XLink to="https://en.wikipedia.org/wiki/United_States_customary_units#Units_of_temperature">it is considered a member of the US Customary Units system</XLink>.
        </p>

        <p>
          The United States is the only major country in the world that hasn't adopted the Metric System as their standard system of measurements. The story is that in 1793 Thomas Jefferson, a founding father of the United States, requested Metric unit samples from France but the ship carrying them to America was lost in a storm. Thus the push to use the Metric System never occurred.
        </p>

        <p>
          <XLink to="https://en.wikipedia.org/wiki/Metric_Conversion_Act">The Metric Conversion Act</XLink> of 1975 made the Metric System the preferred system of US trade and commerce, but only on paper. <XLink to="https://en.wikipedia.org/wiki/United_States_Metric_Board">The United States Metric Board</XLink> was abolished in 1982 by US President Ronald Reagan citing a lack of enthusiasm and budgetary concerns.
        </p>

        <p>
          Many sectors of American industry, government, military, science, engineering, and medicine use the Metric System in various circumstances. But in daily life, both individual and public, the US Customary System is the one that the population has the strongest grasp.
        </p>
      </React.Fragment>
    ),

    liquid: {
      header: {
        content: "Imperial vs US Customary Liquid Volume Units",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            {SITE_NAME} teaches the US Customary Unit System, also known as the United States Customary System (USCS). Despite the shared history, there are distinct differences between the unit system used in the United States and the Imperial unit system used in the United Kingdom.
          </p>

          <p>
            US Customary units are identical to Imperial units for length and mass. Differences are <XLink to="https://en.wikipedia.org/wiki/Comparison_of_the_imperial_and_US_customary_measurement_systems">limited to <i>liquid</i> volumes</XLink>, which is fortunate so long as you don't find yourself converting an English pint to milliliters with the conversion values of a US pint in mind.
          </p>

          {Tables.imperialVsUSVolumes}
        </React.Fragment>
      ),

      summary: {
        header: {
          content: "Summary",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <List bulleted>
              <List.Item>
                Similarities
                <List.List>
                  <List.Item>
                    <b>2 pints</b> make <b>1 quart</b>.
                  </List.Item>
                  <List.Item>
                    <b>4 quarts</b> make <b>1 gallon</b>.
                  </List.Item>
                  <List.Item>
                    <b>1 cup</b> is <b>0.5 pints</b>. While very common in the US Customary Unit System, it is generally ignored in the Imperial Unit system.
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item>
                Differences
                <List.List>
                  <List.Item>
                    The Imperial fluid ounce is 4% smaller than the US fluid ounce.
                  </List.Item>
                  <List.Item>
                    The Imperial pint is 20 Imperial fluid ounces - the US pint is 16 US fluid ounces. The Imperial pint 20% larger than a US pint.
                  </List.Item>
                  <List.Item>
                    The Imperial quart is 40 Imperial fluid ounces - the US quart is 32 US fluid ounces. The Imperial quart 20% larger than a US quart.
                  </List.Item>
                  <List.Item>
                    The Imperial gallon is 160 Imperial fluid ounces - the US gallon is 128 US fluid ounces. The Imperial gallon 20% larger than a US gallon.
                  </List.Item>
                </List.List>
              </List.Item>
            </List>
          </React.Fragment>
        ),
      },

      history: {
        header: {
          content: "The History",
          as: "h3",
        },
        content: (
          <React.Fragment>
            <p>
              In 1824, decades after the US declared independence in 1776, the British Parliament defined an Imperial gallon as the volume of <XLink to="https://en.wikipedia.org/wiki/Fluid_ounce#History">10 pounds of water</XLink> and similarly an Imperial fluid ounce a equivalent to an ounce (weight) of water. Because there are 160 ounces in 10 pounds, that results in 160 fluid ounces in one gallon.
            </p>

            <p>
              The US gallon is not based on the weight of any liquid. Instead it is based on the older <XLink to="https://en.wikipedia.org/wiki/Wine_gallon">1707 English wine gallon</XLink> which was 231 cubic inches and had its own complicated and hard-to-follow history. This is the system that {SITE_NAME} teaches.
            </p>

            <p>
              This all being said, we're talking about <i>liquid</i> volume here. Other units of volume such as cubic inches (often used in mechanics and engineering), cubic feet, etc, are completely identical.
            </p>
          </React.Fragment>
        ),
      },
    },
  },


  // Conversion Guides
  guide: {
    header: {
      content: "Conversion Guides",
      as: "h1",
      dividing: true,
      ...DOCUMENTATION_GUIDE,
    },
    content: (
      <React.Fragment>
        <p>
          In this section you will find multiple resources on how to convert between various units as well as plain-English advice to help you with the mental math you'll find yourself performing until you gain a natural feel.
        </p>
      </React.Fragment>
    ),

    mentalMath: {
      header: {
        content: "A Word on Mental Math",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            {SITE_NAME}'s goal is to teach you to think, imagine, and communicate in a new system of units. If we wanted to only teach you conversion tables we could've just written this Documentation page and been done with it.
          </p>

          <p>
            No, the goal is to make you feel confident giving answers in both Metric and US Units. If you can get to the point where you step outside feel confident in estimating the temperature in both Fahrenheit <i>and</i> Celsius that is when {SITE_NAME} has succeeded.
          </p>

          <p>
            But before that you'll need the ability to quickly calculate conversions. In the guides below, you will find tips to help calculate quick and rough conversions with simple math.
          </p>
        </React.Fragment>
      ),
    },

    percentageTips: {
      header: {
        content: "Tips for Adding and Subtracting Percentages",
        as: "h2",
        dividing: true,
      },
      content: (
        <React.Fragment>
          <p>
            The guides below commonly use suggestions such as "add 10%" or "subtract 5%". This might be easy for some, but if you struggle to calculate a 15% tip for a restaurant bill (as is custom in the United States) this may be a tricky task.
          </p>

          <p>
            Adding 15% to any number is difficult. It is far easier to split up the calculation into two parts...
          </p>

          <List bulleted>
            <List.Item>
              If your bill is $12.00, first calculate <b>10%</b> of that number. Easy, just move the decimal: <b>$1.20</b>!
            </List.Item>
            <List.Item>
              Now for <b>5% more</b>. This is easy! It's <b>half of 10%</b>. Remember that $1.20? Cut that in half (<b>$0.60</b>) and add it! That's a $1.80 tip.
            </List.Item>
            <List.Item>
              <b>Add $1.80</b> to the original $12.00.
            </List.Item>
            <List.Item>
              $13.80 is your final bill.
            </List.Item>
          </List>

          <p>
            By remembering how easy it is to calculate 10% or 5% of any value you can use any of the tips below.
          </p>

          <p>
            Round up and down to easier-to-grasp numbers if needed. For example, calculating a 15% tip for a bill of $37.91 isn't nearly as easy as a $38.00 or even a $40.00 bill. Though you may tip a little more than necessary if you do it'll be far quicker.
          </p>
        </React.Fragment>
      ),
    },

    // Subject: Length
    length: {
      header: {
        content: "Length",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Length,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                    <Grid.Column><Image src="/img/objects/length/bridge.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/ruler.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/building.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/chain.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/tape-measure.gif" /></Grid.Column>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/length/long-tape-measure.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/polevault.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/road-sign.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/rope.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/length/surveyor.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Length is the most straight-forward measurement to deal with. It is also the most wildly-ranging measurement that you'll need to study in terms of scale. Scales ranging from a grain of rice to the circumference of the Earth and beyond are all applicable to any student.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The base Metric unit is the meter. Common prefixes of the meter are the kilometer (1000 meters), centimeter (1/100 of a meter) and millimeter (1/1000 of a meter).
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.length.toMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  An <b>inch</b> is 2.54 <b>centimeters</b>. Multiply by 2 and then add 50% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 6 inches is about 6 × 2 = 12; 12 + 3 = 15 centimeters (actual answer: 15.24cm).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>foot</b> is 30.48 <b>centimeters</b>. Multiply by 30 and then add 50% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 8 feet is about 8 × 30 = 240; 240 + 4 = 244 centimeters. (actual answer: 243.8cm).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>yard</b> is 0.91 <b>meters</b>. Subtract 10%.
                  <List.List>
                    <List.Item>
                      Example: 50 yards is about 50 - 5 = 45 meters (actual answer: 45.72m).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>mile</b> is 1.61 <b>kilometers</b>. Add 50% and then add 10% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 60 miles is about 60 × 1.5 = 90; 90 + 6 = 96 kilometers (actual answer: 96.6km).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>

              <p>
                Luckily, if you have experience with converting velocity between miles per hour to kilometers per hour you can use the same tips as converting miles to kilometers. (50mi = 80.4km; 50mph = 80.4km/h).
              </p>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The more ubiquitous unit is the foot. Common derivative units are the inch (1/12th of a foot), the yard (3 feet), and the mile (5280 feet).
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Charts",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.length.fromMetric}
              <Header as="h5">US Customary Length Unit Relationships</Header>
              {Tables.length.usCustomaryUnitRelations}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>millimeter</b> 0.039 <b>inches</b>. Multiply by 4 and then divide by 100.
                  <List.List>
                    <List.Item>
                      Example: 7 millimeters is about 7 × 4 = 28; 28 / 100 = 0.28 inches (actual answer: 0.276in).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>centimeter</b> is 0.39 <b>inches</b>. Multiply by 4 and then divide by 10.
                  <List.List>
                    <List.Item>
                      Example: 50 centimeters is about 50 × 4 = 200; 200 / 10 = 20 inches (actual answer: 19.7in).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>meter</b> is 39.3 <b>inches</b>. Multiply by 40 and then subtract 100% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 2.5 meters is about 2.5 × 40 = 100; 100 - 2.5 = 97.5 inches (actual answer: 98.4 in).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>meter</b> is 3.28 <b>feet</b>. Multiply by 3 and then add 10%.
                  <List.List>
                    <List.Item>
                      Example: 4 meters is about 4 × 3 = 12; 12 * 1.1 = 13.2 feet (actual answer: 13.1ft).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>meter</b> is 1.094 <b>yards</b>. Add 10%.
                  <List.List>
                    <List.Item>
                      Example: 15 meters is about 15 + 1.5 = 16.5 yards (actual answer: 16.4yd).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>kilometer</b> is 0.62 <b>miles</b>. Multiply by 6 and then divide by 10.
                  <List.List>
                    <List.Item>
                      Example: 25 kilometers is about 25 × 6 = 150; 150 / 10 = 15 miles (actual answer: 15.5mi).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>

              <p>
                Luckily, if you have experience with converting velocity between kilometers per hour to miles per hour you can use the same tips as converting kilometers to miles. (50km = 31mi; 50km/h = 31mph).
              </p>
            </React.Fragment>
          ),
        },
      },
    },


    // Subject: Mass
    mass: {
      header: {
        content: "Mass",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Mass,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                    <Grid.Column><Image src="/img/objects/mass/barbell.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/body-scale.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/kilogram.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/cinder-block.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/scale.gif" /></Grid.Column>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/mass/dump-truck.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/dumbell.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/flour.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/rock.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/mass/strawberries.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Mass, or more commonly referred to as weight, is an important measure in daily life. Scales vary from small portions you might encounter in the kitchen to the weight of large vehicles and beyond.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The base unit is, oddly, the kilogram. The single gram was considered too small to be a practical base. Common prefixes are the kilogram (1000 grams) and milligram (1/1000 of a gram). Additionally, there is the tonne / "metric ton" (1000 kilograms).
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.mass.toMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  An <b>ounce</b> is 28.35 <b>grams</b>. Multiply by 30 and then subtract 5%.
                  <List.List>
                    <List.Item>
                      Example: 6 ounces is about 6 × 30 = 180; 180 - 9 = 171 grams (actual answer: 170.1g).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>pound</b> is 0.45 <b>kilograms</b>. Divide by 2 and then subtract 10%.
                  <List.List>
                    <List.Item>
                      Example: 160 pounds is about 160 / 2 = 80; 80 - 8 = 72 kilograms (actual answer: 72.6kg).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>US ton</b> is 0.91 <b>metric tonnes</b>. Subtract 10%.
                  <List.List>
                    <List.Item>
                      Example: 14 US tons is about 14 - 1.4 = 12.6 tonnes (actual answer: 12.7t).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The most ubiquitous unit is the pound. Common derivative units are the ounce (1/16 of a pound) and the US ton / short ton (2000 pounds). The grain unit is not taught on this website as it is of uncommon use, effectively replaced with the metric gram.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.mass.fromMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  There are 28.35 <b>grams</b> in 1 <b>ounce</b>. Divide by 30 and then add 5%.
                  <List.List>
                    <List.Item>
                      Example: 240 grams is about 240 / 30 = 8; 8 + 0.4 = 8.4 ounces (actual answer: (8.46oz).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>kilogram</b> is 2.2 <b>pounds</b>. Multiply by 2 and then add 10%.
                  <List.List>
                    <List.Item>
                      Example: 60 kilograms is about 60 × 2 = 120; 120 + 12 = 132 pounds (actual answer: 132.3lb).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>metric tonne</b> is 1.1 <b>US Tons</b>. Add 10%.
                  <List.List>
                    <List.Item>
                      Example. 4 tonnes is about 4.4 US tons (actual answer: 4.41ton).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },
    },


    // Subject: Volume
    volume: {
      header: {
        content: "Volume",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Volume,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                    <Grid.Column><Image src="/img/objects/volume/soda-bottle.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/bath-tub.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/bottle.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/measurement-cups.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/syringe.gif" /></Grid.Column>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/volume/balloons.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/pitcher.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/hose.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/pool.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/volume/soda-can.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Volume by definition is the cube of distance. Daily life very much only deals with volume in terms of water and other consumable liquids, but there is still plenty of applications in science and mechanics to consider different units of volume.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The base unit is the liter. The most common prefix is the milliliter (1/1000 of a liter). Additionally,
              the cubic meter (equivalent to 1000 liters) can also be used for much larger volumes.
            </p>
          </React.Fragment>
        ),

        additionalNotes: {
          header: {
            content: "Additional Notes",
            as: "h5",
          },
          content: (
            <React.Fragment>
              <p>
                <i>{SITE_NAME} uses the US Customary Units for volume. A further distinction to note is the US Customary Cup. It is equal to 8 fluid ounces or 236.6 milliliters. The US Legal Cup is slightly larger at 240 milliliters and is used in nutrition labelling as a half-baked metrication by the US. As a result, it is often errantly understood that "a cup" is both 240 milliliters and 8 ounces when this is not the case. To add confusion, converting cups to milliliters using Google will use the US Legal Cup.</i>
              </p>
            </React.Fragment>
          ),
        },

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.volume.toMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>fluid ounce</b> is 29.57 <b>milliliters</b>. Multiply by 30 and then subtract 50% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 10 fluid ounces is about 10 × 30 = 300; 300 - 5 = 295 milliliters (actual answer:
                      295.7ml).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>cup</b> is 236.6 <b>milliliters</b>. Multiply by 250 and then subtract 5%.
                  <List.List>
                    <List.Item>
                      Example: 4 cups is about 250 × 4 = 1000; 1000 - 50 = 950 milliliters (actual answer: 946ml).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>pint</b> is 473.2 <b>milliliters</b>. Multiply by 500 and then subtract 5%.
                  <List.List>
                    <List.Item>
                      Example: 3 pints is about 500 × 3 = 1500; 1500 - 75 = 1425 (actual answer: 1419.5ml).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>quart</b> is 0.95 <b>liters</b>. Subtract 5%.
                  <List.List>
                    <List.Item>
                      Example: 6 quarts is about 6 - 0.3 = 5.7 liters (actual answer: 5.68l).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>gallon</b> is 3.79 <b>liters</b>. Multiply by 4 and then subtract 25% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 60 gallons is about 60 × 4 = 240; 240 - 15 = 225 liters (actual value: 227.1l).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              Arguably the most ubiquitous unit of liquid volume measurement is the gallon. Cubic feet can also be used for much larger (typically non-liquid) volumes.
            </p>
          </React.Fragment>
        ),

        additionalNotes: {
          header: {
            content: "Additional Notes",
            as: "h5",
          },
          content: (
            <React.Fragment>
              <p>
                <i>In the US the combination of units to describe a specific amount of liquid is often an exercise of discretion. So long as the pattern is easy to recognize and not mixed it should be acceptable.</i>
              </p>

              <p>
                <i>For example, the amount of 160 fluid ounces could be represented at "5 quarts", "1 gallon and 1 quart", or "1.25 gallons" with broad acceptance. An amount such as 168 fluid ounces could be represented as "5 quarts and 1 cup" or "1 gallon, 1 quart, and 1 cup" or "1 gallon and 40 fluid ounces". But it should not be represented as "1.25 gallons and 1 cup", violating a mixing of whole units and decimal units.</i>
              </p>

              <p>
                <i>Amounts utilizing a mix of whole and decimal units should limit the decimal value to fluid ounces. For example, with 169.25 fluid ounces resulting in "1 gallon, 1 quart, 1 cup, and 1.25 fluid ounces" and not "1 gallon, 1 quart, and 1.156 cups."</i>
              </p>

              <p>
                <i>In practice decimal values are quite commonly accepted in most situations. For example, you will never purchase "5 quarts of gasoline", for instance, you will purchase 1.25 gallons of gasoline. Additionally, you'll more likely see a baking recipe call for 1.5 cups, not "1 cup, 4 fluid ounces", of milk.</i>
              </p>

              <p>
                <i>{SITE_NAME} supports a combination input of gallons, quarts, and fluid ounces when dealing with fluid ounces. Pints and cups are typically dropped when dealing with amounts of liquid greater than a quart. Questions that seek answers specifically in gallons, quarts, pints, or cups will request them as decimal values.</i>
              </p>

              <p>
                Finally, when context is provided it is common to simply refer to fluid ounces as "ounces" in conversation (for example: "this water bottle holds 32 <i>ounces</i>"). This might provide an interesting dilemma in food packaging as one may have to inspect a label closely to see if the measurement is in fluid ounces (volume) or ounces (weight).
              </p>
            </React.Fragment>
          ),
        },

        chart: {
          header: {
            content: "Charts",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.volume.fromMetric}
              <Header as="h5">US Customary Volume Unit Relationships</Header>
              {Tables.volume.usCustomaryUnitRelations}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  There are 29.57 <b>milliliters</b> in 1 <b>fluid ounce</b>. Divide by 30.
                  <List.List>
                    <List.Item>
                      Example: 360 milliliters is about 360 / 30 = 12 fluid ounces (actual answer: 12.2fl oz).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  There are 236.6 <b>milliliters</b> in 1 <b>cup</b>. Divide by 250 and then add 5%.
                  <List.List>
                    <List.Item>
                      Example: 750 milliliters is about 750 / 250 = 3; 3 + 0.15 = 3.15 cups (actual answer: 3.17cup).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  There are 473 <b>milliliters</b> in 1 <b>pint</b>. Divide by 500 and then add 5%.
                  <List.List>
                    <List.Item>
                      Example: 1500 milliliters is about 1500 / 500 = 3; 3 + 0.15 = 3.15 pints (actual answer: 3.17pt).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>liter</b> is 1.06 <b>quarts</b>. Add 5% more.
                  <List.List>
                    <List.Item>
                      Example: 10 liters is about 10 + 0.5 = 10.5 quarts (actual answer: 10.57qt).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  There are 3.79 <b>liters</b> in 1 <b>gallon</b>. Divide by 4 and then add 5%.
                  <List.List>
                    <List.Item>
                      Example: 16 liters is about 16 / 4 = 4; 4 + 0.2 = 4.2 gallons (actual answer: 4.23gal).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },
    },


    // Subject: Temperature
    temperature: {
      header: {
        content: "Temperature",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Temperature,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                    <Grid.Column><Image src="/img/objects/temperature/sun.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/boiling-pot.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/cooler.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/flame.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/mittens.gif" /></Grid.Column>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/temperature/oven.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/snow-flake.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/sun-clouds.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/thermometer.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/temperature/food-pot.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Temperature is the black sheep of the six measurement subjects. The Fahrenheit and Celsius scales can have negative values, can represent differences as well as specific temperatures, and most confusingly have different zeroes. These all combine to make conversion a cumbersome affair and makes pattern recognition far more ideal.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the unit you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              Celsius is a scale of 100 degrees between the temperatures of water freezing and boiling. Freezing is defined as 0°C and boiling at 100°C. Originally named centigrade, its name was changed to Celsius in 1948 to honor a Swedish astronomer whose pioneering temperature scale, conceived in 1742, predated the Metric System by half a century.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Conversion Formulae",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.temperature.toMetric}
              <p>
                <i>Converting from Fahrenheit to Celsius is harder than the reverse.</i>
              </p>
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  <i>(For <u>weather temperature range</u>)</i>: With <b>Fahrenheit</b> subtract 30 and then divide by 2.
                  <List.List>
                    <List.Item>
                      Example: 50 Fahrenheit is about 50 - 30 = 20; 20 / 2 = 10 Celsius (actual answer: 10°C).
                    </List.Item>
                    <List.Item>
                      Example: 10 Fahrenheit is about 10 - 30 = -20; -20 / 2 = -10 Celsius (actual answer: -12°C).
                    </List.Item>
                    <List.Item>
                      Example: 92 Fahrenheit is about 92 - 30 = 62; 62 / 2 = 31 (actual answer: 33.3°C).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  <i>(For temperatures <u>300-800°F</u>)</i>: With <b>Fahrenheit</b> divide by 2.
                  <List.List>
                    <List.Item>
                      Example: 300 Fahrenheit is about 300 / 2 = 150 Celsius (actual answer: 149°C).
                    </List.Item>
                    <List.Item>
                      Example: 550 Fahrenheit is about 550 / 2 = 275 Celsius (actual answer: 288°C).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  <i>(For temperatures <u>800°F or more</u>)</i>: With <b>Fahrenheit</b> divide by 2 and then add 10%.
                  <List.List>
                    <List.Item>
                      Example: 800 Fahrenheit is about 800 / 2 = 400; 400 + 40 = 440 Celsius (actual answer: 426°C).
                    </List.Item>
                    <List.Item>
                      Example: 4400 Fahrenheit is about 4400 / 2 = 2200; 2200 + 220 = 2420 Celsius (actual answer: 2427°C).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>

              <p>
                Additionally, temperature differences are a separate concept. You do not need to concern yourself with - 32. If someone said "raise/lower the thermostat by 9°F", that would be 9 × (5/9) which would be 5°C. "Multiply by 5 and then divide by 9."
              </p>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the unit you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              Fahrenheit is a scale of 180 degrees between the temperatures of water freezing and boiling. Freezing is defined as 32°F and boiling at 212°F. The original 1724 foundation of the scale was afflicted with poorly reasoned, irresponsibly arbitrary, and inaccurately measured reference points.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Conversion Formulae",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.temperature.fromMetric}
              <p>
                <i>Converting from Celsius to Fahrenheit is easier than the reverse.</i>
              </p>
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  <i>(For <u>weather temperature range</u>)</i>: With <b>Celsius</b> multiply by 2 and then add 30.
                  <List.List>
                    <List.Item>
                      Example: 10 Celsius is about 10 × 2 = 20; 20 + 30 = 50 Fahrenheit (actual answer: 50°F).
                    </List.Item>
                    <List.Item>
                      Example: -10 Celsius is about -10 × 2 = -20; -20 + 30 = 10 Fahrenheit (actual answer: 14°F).
                    </List.Item>
                    <List.Item>
                      Example: 30 Celsius is about 30 × 2 = 60; 60 + 30 = 90 Fahrenheit (actual answer: 86°F).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  <i>(For temperatures <u>150-400°C</u>)</i>: With <b>Celsius</b> multiply by 2.
                  <List.List>
                    Example: 150 Celsius is about 150 × 2 = 300 Fahrenheit (actual answer: 302°F).
                  </List.List>
                  <List.List>
                    Example: 300 Celsius is about 300 × 2 = 600 Fahrenheit (actual answer: 572°F).
                  </List.List>
                </List.Item>
                <List.Item>
                  <i>(For temperatures <u>400°C or more</u>)</i>: With <b>Celsius</b> multiply by 2 and then subtract 10%.
                  <List.List>
                    Example: 400 Celsius is about 400 × 2 = 800; 800 - 80 = 720 Fahrenheit (actual answer: 752°F).
                  </List.List>
                  <List.List>
                    Example: 2500 Celsius is about 2500 × 2 = 5000; 5000 - 500 = 4500 Fahrenheit (actual answer: 4532°F).
                  </List.List>
                </List.Item>
              </List>

              <p>
                For more accurate conversions we do have one suggestion: It might be easier to do fractional multiplication in your head with the fraction 18/10 (or the decimal 1.8) instead of the awkward 9/5. So for every 10 degrees Celsius that is 18 degrees Fahrenheit.
              </p>

              <p>
                Additionally, temperature differences are a separate concept. You do not need to concern yourself with + 32. If someone said "raise/lower the thermostat by 5°C", that would be 5 × (9/5), which is 9°F. "Multiply by 9 and then divide by 5."
              </p>
            </React.Fragment>
          ),
        },
      },
    },


    // Subject: Velocity
    velocity: {
      header: {
        content: "Velocity",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Velocity,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                    <Grid.Column><Image src="/img/objects/velocity/sports-car.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/airplane.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/tachometer.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/race-car.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/rocket.gif" /></Grid.Column>
                    <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT}>&nbsp;</Responsive>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/velocity/bicycle.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/running-shoes.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/slingshot.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/train.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/velocity/baseball-mitt.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Velocity is the measurement of distance travelled over a set unit of time. Scales of velocity that concern people are usually centered around travelling. Whether on foot, on bicycle, in a car, or an airliner, there is a wide range of speeds to be familiar with.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the unit you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              While not the only Metric unit for velocity, kilometers per hour is by far the most common. The most commonly used symbol is "km/h" with all lowercase letters. Though discouraged, it may appear written as "km/hr", "kmh", "kmph","kph", or another similar way with varied capitalization.
            </p>

            <p>
              Additionally, the unit meters per second (m/s) is also in wide use in engineering, science, and physics. {SITE_NAME} does not cover this unit.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.velocity.toMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>mile per hour</b> is 1.61 <b>kilometers per hour</b>. Add 50% and then add 10% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 60 mph is about 60 + 30; 90 + 6 = 96 km/h (actual answer: 96.6km/h).
                    </List.Item>
                    <List.Item>
                      Example: 100 mph is about 100 + 50 = 150; 150 + 10 = 160 km/h (actual answer: 160.9km/h).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>

              <p>
                Luckily, if you have experience with converting distance between miles to kilometers you can use the same tips as converting miles per hour to kilometers per hour. (50mph = 80.4km/h; 50mi = 80.4km).
              </p>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the unit you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              While not the only US Customary Unit for velocity, miles per hour is by far the most common. The most commonly used symbol is "mph", though all caps "MPH" is also acceptable. You may see "mi/h", though it is less common.
            </p>

            <p>
              Additionally, the unit feet per second (ft/s) is also in wide use in engineering, science, and physics. {SITE_NAME} does not cover this unit.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.velocity.fromMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>kilometer per hour</b> is 0.62 <b>miles per hour</b>. Multiply by 6 and then divide by 10.
                  <List.List>
                    <List.Item>
                      Example: 25 km/h is about 25 × 6 = 150; 150 / 10 = 15 mph (actual answer: 15.5mph).
                    </List.Item>
                    <List.Item>
                      Example: 200 km/h is about 200 × 6 = 1200; 1200 / 10 = 120 mph (actual answer: 124.3mph).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>

              <p>
                Luckily, if you have experience with converting distance between kilometers to miles you can use the same tips as converting kilometers per hour to miles per hour. (50km/h = 31mph; 50km = 31mi).
              </p>
            </React.Fragment>
          ),
        },
      },
    },


    // Subject: Area
    area: {
      header: {
        content: "Area",
        as: "h2",
        dividing: true,
        ...SUBJECT_ICONS.Area,
      },
      content: (
        <React.Fragment>
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/area/paper.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/soccer-field.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/house.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/local-map.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/globe.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
                <Grid columns="equal">
                  <Grid.Row>
                    <Grid.Column><Image src="/img/objects/area/rug.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/cloth.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/football-field.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/office-building.gif" /></Grid.Column>
                    <Grid.Column><Image src="/img/objects/area/usa-map.gif" /></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            Area is simply the square of length. In practice area proves to be an interesting subject as the orders of magnitude involved in measurements range widely and the units range widely as well. That is to say, units such as square feet and square meters used to measure the floorspace of a home is likely not at all useful when dealing with a plot of land, and an acre or hectare would hardly be appropriate to represent the size of a state or country.
          </p>
        </React.Fragment>
      ),

      toMetric: {
        header: {
          content: "To Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_TO_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              The base unit is the square meter (m²). In addition, the square kilometer (km²) and the hectare (ha) will also be used.
            </p>

            <p>
              The hectare (pronounced <i>hek-tare</i>) is a rare departure from form but is used because it is somewhat comparable to the US acre. It is the only named unit that is accepted for use with SI. A hectare is a square area with 100 meter sides (10,000m², or 0.01km²).
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.area.toMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>square foot</b> is 0.09 <b>square meters</b>. Divide by 10 and subtract 10% from that value.
                  <List.List>
                    <List.Item>
                      Example: 150 square feet is about 150 / 10 = 15; 15 - 1.5 = 13.5 square meters (actual value: 13.9m²).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  An <b>acre</b> is 0.4 <b>hectares</b>. Multiply by 4 and then divide by 10.
                  <List.List>
                    <List.Item>
                      Example: 15 acres is about 15 × 4 = 60; 60 / 10 = 6 hectares (actual value: 6.1ha).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>square mile</b> is 2.59 <b>square kilometer</b>. Multiply by 2 and then add 50% <u>of the starting value</u>. <i>It will give you a rough low-end estimate.</i>
                  <List.List>
                    <List.Item>
                      Example: 8 square miles is about 8 × 2 = 16; 16 + 4 = 20 square kilometers (actual answer: 20.7km²).
                    </List.Item>
                    <List.Item>
                      You can also use your knowledge of converting inches to centimeters to help convert square miles to square kilometers, as their ratio (2.54cm per 1in) is fairly similar (2.59km² to 1mi²).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },

      fromMetric: {
        header: {
          content: "From Metric",
          as: "h3",
          subheader: "Description of the units you'll be converting to...",
          ...DOCUMENTATION_FROM_METRIC,
        },
        content: (
          <React.Fragment>
            <p>
              Like it is for length, there is no US Customary "base unit" for area. But we can use square feet for this purpose. The acre is used for plots of land and square miles are for much larger areas up to and including countries and continents.
            </p>
          </React.Fragment>
        ),

        chart: {
          header: {
            content: "Chart",
            as: "h4",
          },
          content: (
            <React.Fragment>
              {Tables.area.fromMetric}
            </React.Fragment>
          ),
        },

        tips: {
          header: {
            content: "Helpful Conversion Tips",
            as: "h4",
          },
          content: (
            <React.Fragment>
              <List bulleted>
                <List.Item>
                  A <b>square meter</b> is 10.76 <b>square feet</b>. Multiply by 10 and then add 10%. <i>It will give you a rough high-end estimate.</i>
                  <List.List>
                    <List.Item>
                      Example: 18 square meters is about 18 × 10 = 180; 180 + 18 = 198 square feet (actual value: 193.8ft²).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>hectare</b> is 2.47 <b>acres</b>. Multiply by 2 and then add 50% <u>of the starting value</u>.
                  <List.List>
                    <List.Item>
                      Example: 24 hectares is about 24 × 2 = 48; 48 + 12 = 60 acres (actual value: 59.3ac).
                    </List.Item>
                  </List.List>
                </List.Item>
                <List.Item>
                  A <b>square kilometer</b> is 0.39 <b>square miles</b>. Multiply by 4 and then divide by 10.
                  <List.List>
                    <List.Item>
                      Example: 40 square kilometers is about 40 × 4 = 160; 160 / 10 = 16 square miles (actual value: 15.4mi²).
                    </List.Item>
                    <List.Item>
                      You can also use your knowledge of converting centimeters to inches to help convert square kilometers to square miles, as their ratio (0.39in to 1cm) is fairly similar (0.39mi² to 1km²).
                    </List.Item>
                  </List.List>
                </List.Item>
              </List>
            </React.Fragment>
          ),
        },
      },
    },
  },
};
