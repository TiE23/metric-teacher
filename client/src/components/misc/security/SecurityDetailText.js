/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      This site is currently a personal project and does not yet support HTTPS security, so passwords are transmitted in plain text to {SITE_NAME}'s server. Which means you're at risk to have your password stolen if your connection is insecure.
    </p>

    <p>
      Until HTTPS security is added I encourage you use simple passwords and indeed, made-up email addresses (there is no email confirmation system, yet) so long as you can remember them.
    </p>

    <p>
      Your password is encrypted (hashed+salted) using <XLink to="https://en.wikipedia.org/wiki/Bcrypt">bcrypt</XLink> (specifically <XLink to="https://www.npmjs.com/package/bcryptjs/v/0.7.6">bycryptjs</XLink>) before being stored. This is industry standard practice.
    </p>

    <p>
      This is to explain to you that I, the owner of this website, never see your password (<XLink to="https://github.com/TiE23/metric-teacher/blob/master/server/src/resolvers/Mutation/auth.js">Source Code</XLink>). It's encrypted in the database and by my rough estimate would take a custom $8,000 computer up to 200 days of brute force to crack a single truly random six character alphanumeric password. Make that seven characters and it might take 33 years.
    </p>

    <p>
      Your name, email address, and your Survey answers are all visible to me but are not made public. I've taken specific steps to prevent this from happening through specific schema choices in {SITE_NAME}'s API design. I will never share your data with anyone.
    </p>

    <p>
      Finally, the database is secured with access protection and unique passwords and keys. All that said I cannot guarantee I could withstand a direct hacking attack, though I would suspect nefarious attackers would rather break the site than try and steal anything from it.
    </p>

    <p style={{ textAlign: "right" }}>
      <i>—Kyle Geib, December 2018</i>
    </p>
  </React.Fragment>
);
