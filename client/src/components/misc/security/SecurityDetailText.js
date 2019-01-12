/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      This site is a personal project, it is not owned or operated by a business or organization. That said, I've taken great care to assure that all communication to {SITE_NAME} is secured with <b>HTTPS over TLS</b>, a layer of security used by all major websites to keep emails, passwords, and credit card numbers safe from prying eyes.
    </p>

    <p>
      Your password is encrypted (hashed + salted) using <XLink to="https://en.wikipedia.org/wiki/Bcrypt"><b>bcrypt</b></XLink> before being stored. This is industry standard practice. This is to explain to you that I, the owner of this website, never see your password (<XLink to="https://github.com/TiE23/metric-teacher/blob/master/server/src/resolvers/Mutation/auth.js">Source Code</XLink>). It's encrypted in the database and would take decades of computing time to crack a good random password.
    </p>

    <p>
      Your name, e-mail address, and your Survey answers are all visible to me but are not made public to any other users. I will never share your data with anyone. A legal TOS is on the long list of to-do's right now, but please trust me when I say I did not spend months of my life building an educational website as some scheme to collect e-mail addresses to sell to advertizers for pennies.
    </p>

    <p>
      Finally, the site's hosting and database is secured with layers of password and key security. Inter-server communications are also secured with <b>HTTPS over TLS</b>. All that said I cannot guarantee {SITE_NAME} could withstand a world-class hacking attack as unlikely as that is to occur.
    </p>

    <p style={{ textAlign: "right" }}>
      —Kyle Geib, January 2019
      <br />
      <i>Creator of {SITE_NAME}</i>
    </p>
  </React.Fragment>
);
