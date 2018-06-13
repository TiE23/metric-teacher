const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = {
  async signup(parent, args, ctx, info) {
    const defaultArgs = {
      type: 0,
      status: 0,
      flags: 0,
    };
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: { ...defaultArgs, ...args, password },
    }, info);

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
