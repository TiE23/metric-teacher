const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  BCRYPT_SALT_LENGTH,
  USER_TYPE_STUDENT,
  USER_STATUS_NORMAL,
  FLAGS_NONE,
} = require("../../constants");

const auth = {
  async signup(parent, args, ctx) {
    // All new users are given these settings. Can't allow people to sign-up as Admins, after all!
    const defaultArgs = {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      flags: FLAGS_NONE,
    };
    const password = await bcrypt.hash(args.password, BCRYPT_SALT_LENGTH);
    const user = await ctx.db.mutation.createUser({
      data: { ...defaultArgs, ...args, password },
    });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },

  async login(parent, { email, password }, ctx) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    // TODO Add login logging to database
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },
};

module.exports = { auth };
