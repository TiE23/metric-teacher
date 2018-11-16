/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

export default (
  <React.Fragment>
    <p>
      This site is currently a personal project and does not yet support HTTPS security, so passwords are transmitted in plain text to Metric-Teacher's server. Which means you're at risk to have your password stolen if your connection is insecure.
    </p>

    <p>
      Until HTTPS security is added I encourage you use very low security passwords and indeed, made-up email addresses (there is no email confirmation system, yet) so long as you can remember them.
    </p>

    <p>
      Your password is encrypted (hashed+salted) using <XLink to="https://en.wikipedia.org/wiki/Bcrypt">bcrypt</XLink>, specifically <XLink to="https://www.npmjs.com/package/bcryptjs/v/0.7.6">bycryptjs</XLink>, set to a salt length of 10 before being stored. This is industry standard practice.
    </p>

    <p>
      This is to explain to you that I, the owner of this website, can't get my hands on your password (<XLink to="https://github.com/TiE23/metric-teacher/blob/master/server/src/resolvers/Mutation/auth.js">Source Code</XLink>). It's all scrambled gibberish in my database and by my rough estimate would take an $8,000 cracking PC (that I don't have) up to 200 days of brute force to crack a single truly random six character alphanumeric password. Make that seven characters and it might take me 33 years.
    </p>

    <p>
      Your name, email address, and your Survey answers are all visible to me but are not made public. I've taken specific steps to prevent this from happening through specific schema choices in Metric-Teacher's API.
    </p>

    <p>
      Finally, the database is secured with relatively complicated access protection and very convoluted passwords. All that said I cannot guarantee I could withstand a direct hacking attack.
    </p>

    <p style={{ textAlign: "right" }}>
      <i>—Kyle Geib, November 2018</i>
    </p>
  </React.Fragment>
);
