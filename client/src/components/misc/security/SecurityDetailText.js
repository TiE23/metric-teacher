/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      This site is currently a personal project and does not yet support HTTPS security so passwords are transmitted in plain text to {SITE_NAME}'s server. Which means, like any other non-HTTPS website, you're at risk to have your password stolen if your connection is insecure.
    </p>

    <p>
      Until HTTPS security is added I encourage you use simple passwords and indeed, made-up e-mail addresses (there is no e-mail confirmation system, yet) so long as you can remember them.
    </p>

    <p>
      Your password is encrypted (hashed+salted) using <XLink to="https://en.wikipedia.org/wiki/Bcrypt">bcrypt</XLink> (specifically <XLink to="https://www.npmjs.com/package/bcryptjs/v/0.7.6">bycryptjs</XLink>) before being stored. This is industry standard practice. This is to explain to you that I, the owner of this website, never see your password (<XLink to="https://github.com/TiE23/metric-teacher/blob/master/server/src/resolvers/Mutation/auth.js">Source Code</XLink>). It's encrypted in the database and would take decades to crack a good random password.
    </p>

    <p>
      Your name, e-mail address, and your Survey answers are all visible to me but are not made public to any other users. I will never share your data with anyone. A legal TOS is on the long list of to-do's right now, but please trust me when I say I did not spend months of my life on a website as some scheme to collect e-mail addresses to sell to advertizers.
    </p>

    <p>
      Finally, the site's hosting and database is secured with layers of password and key security. All that said I cannot guarantee I can withstand a world-class hacking attack, as unlikely as that is to occur.
    </p>

    <p style={{ textAlign: "right" }}>
      —Kyle Geib, January 2019
      <br />
      <i>Creator of {SITE_NAME}</i>
    </p>
  </React.Fragment>
);
