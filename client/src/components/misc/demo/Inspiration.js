/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Header, Image } from "semantic-ui-react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <Image src="/img/credits/kyle.gif" size="small" floated="right" rounded />

    <p>
      Hello! I'm <b>Kyle Geib</b> and I want to tell you a little bit about the ideas behind {SITE_NAME}.
    </p>

    <p>
      I always viewed the Metric System as the <b>clear superior</b> to US units. But as an American I felt cursed to always only feel comfortable with US units. I would ride the bus to work practicing conversions between Fahrenheit and Celsius in my head and found it <b>tiring</b>. I wished I could just <i>know</i> Celsius.
    </p>

    <p>
      I was inspired by <XLink to="https://www.duolingo.com/"><b>Duolingo</b></XLink>, an acclaimed website that teaches its users foreign languages by having them practice a few minutes a day with <b>programmatically generated flash-cards</b>. I thought that the same structure could work for teaching Americans the Metric System.
    </p>

    <Header as="h3" content="Thinking In Metric" />

    <p>
      When I had the opportunity to drive in Europe I found myself naturally becoming comfortable with kilometers per hour. I had to - they were the only units on the speedometer! After some time <i>I wasn't thinking</i> "Oh, 50 km/h is about 30 mph", I was simply <b>thinking</b> in kilometers per hour. I was adjusting speed effortlessly as new road signs appeared without having to stare at the speedometer.
    </p>

    <p>
      My theory is that we <i>associate feelings</i> with these numbers. If you already have an <b>instinctive feeling</b> for 30 mph, I want {SITE_NAME} to teach you to feel the same about 50 km/h.
    </p>

    <Header as="h3" content="Making It Personal" />

    <p>
      How <b>tall</b> are you? How much do you <b>weigh</b>? What's the coolest <b>outdoor temperature</b> that you'd wear shorts in? We all have answers to these questions even if they're not fixed. If {SITE_NAME} can teach you that 21°C is your preferred room temperature of 70°F then you'll start to recognize temperatures in Celsius.
    </p>

    <p>
      {SITE_NAME} does this with a system of <b>Survey Questions</b>. By asking people meaningful questions they can begin associating Metric unit measurements with values that have personal meaning to them.
    </p>

    <Header as="h3" content="Exact Conversions?" />

    <p>
      There will always be a place for exact conversions. 30 mph, for example, is not 50 km/h; it is actually 48.28 km/h. But we can leave that job to calculators and Siri. The important part is that if you can <b>confidently convert</b> between the two, you can <b>confidently understand</b> in either. With practice, {SITE_NAME} will give you that confidence.
    </p>
  </React.Fragment>
);
