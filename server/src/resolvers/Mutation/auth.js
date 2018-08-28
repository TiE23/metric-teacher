const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  BCRYPT_SALT_LENGTH,
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  NAME_FIRST_MAXIMUM_LENGTH,
  NAME_LAST_MAXIMUM_LENGTH,
  EMAIL_MAXIMUM_LENGTH,
  USER_TYPE_STUDENT,
  USER_STATUS_NORMAL,
  FLAGS_NONE,
} = require("../../constants");

const {
  InputAboveMaximum,
  InputBelowMinimum,
} = require("../../errors");

const auth = {
  /**
   * Sign up for an account. All arguments are required and emails need to be unique.
   * TODO - Email validity check (it's not just for the client these days!!)
   * TODO - Email confirmations (waaaay in the future no doubt!)
   * TODO - Password check (complexity requirements?, trimming, easy password blocking)
   * TODO - Name check (no numerals, no odd punctuation, no emoji, etc)
   * TODO - Honorific input support.
   * @param parent
   * @param args
   *        email: String!
   *        password: String!
   *        fname: String!
   *        lname: String!
   * @param ctx
   * @returns AuthPayload!
   */
  async signup(parent, args, ctx) {
    // All new users are given these settings. Can't allow people to sign-up as Admins, after all!
    const defaultArgs = {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      flags: FLAGS_NONE,
    };

    // Enforce input limits.
    if (args.email && args.email.length > EMAIL_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("email", EMAIL_MAXIMUM_LENGTH);
    }
    if (args.password && args.password.length < PASSWORD_MINIMUM_LENGTH) {
      throw new InputBelowMinimum("password", PASSWORD_MINIMUM_LENGTH);
    }
    if (args.password && args.password.length > PASSWORD_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("password", PASSWORD_MAXIMUM_LENGTH);
    }
    if (args.fname && args.fname.length > NAME_FIRST_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("fname", NAME_FIRST_MAXIMUM_LENGTH);
    }
    if (args.lname && args.lname.length > NAME_LAST_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("lname", NAME_LAST_MAXIMUM_LENGTH);
    }

    const password = await bcrypt.hash(args.password, BCRYPT_SALT_LENGTH);
    const user = await ctx.db.mutation.createUser({
      data: { ...defaultArgs, ...args, password },
    });

    return {
      token: jwt.sign({
        id: user.id,
        type: user.type,
        status: user.status,
        flags: user.flags,
      }, process.env.APP_SECRET),
      user,
    };
  },


  /**
   * Log in to the account of a user by providing the email and password. Bcrypt is used
   * to check the password input for correctness.
   * @param parent
   * @param args
   *        email: String!
   *        password: String!
   * @param ctx
   * @returns AuthPayload!
   */
  async login(parent, args, ctx) {
    const user = await ctx.db.query.user(
      { where: { email: args.email } },
      "{ id, type, status, flags, password }",
    );
    if (!user) {
      throw new Error(`No such user found for email: ${args.email}`);
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    // TODO Add login logging to database
    return {
      token: jwt.sign({
        id: user.id,
        type: user.type,
        status: user.status,
        flags: user.flags,
      }, process.env.APP_SECRET),
      user: { id: user.id },  // Used by AuthPayload.js's function user().
    };
  },
};

module.exports = { auth };
