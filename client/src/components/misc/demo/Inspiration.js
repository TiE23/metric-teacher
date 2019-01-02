/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Header, Image } from "semantic-ui-react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <Image src="/img/challenge/m-written.gif" size="small" floated="right" rounded />

    <p>
      A few years ago I was using <XLink to="https://www.duolingo.com/"><b>Duolingo</b></XLink>, a site that teaches foreign languages through repetition of <b>programmatically generated flash-cards</b> that you return to for 10 minutes a day. I thought that the same method could work for teaching Americans the Metric System.
    </p>

    <Header as="h3" content="Thinking In Metric" />

    <p>
      I've had experience driving rental cars in Ireland, France, and Japan where I found myself becoming comfortable with kilometers per hour. After some time <i>I wasn't thinking</i> "Oh, 50 km/h is about 30 mph", I was simply <b>thinking</b> in kilometers per hour.
    </p>

    <p>
      My theory is that we <i>associate feelings</i> with these numbers. If you already have an <b>instinctive feeling</b> for 30mph, I want {SITE_NAME} to teach you to feel the same about 50km/h.
    </p>

    <Header as="h3" content="Making It Personal" />

    <p>
      How <b>tall</b> are you? How much do you <b>weigh</b>? What's the coolest <b>outdoor temperature</b> that you'd wear shorts in?  We all have answers to these questions even if they might be hard to pin down. But if you can learn to recognize that 21°C and 70°F are both your preferred room temperature then you'll start to simply feel in Celsius.
    </p>

    <p>
      This idea is {SITE_NAME}'s <b>Survey Question</b> system. By asking people meaningful questions they can begin associating Metric unit measurements with those answers.
    </p>
  </React.Fragment>
);
