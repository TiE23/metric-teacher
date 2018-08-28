const bcrypt = require("bcryptjs");

const {
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  UserNotFound,
  InputAboveMaximum,
  InputBelowMinimum,
  ExistingPasswordRequired,
} = require("../../errors");

const {
  BCRYPT_SALT_LENGTH,
  PASSWORD_MINIMUM_LENGTH,
  PASSWORD_MAXIMUM_LENGTH,
  EMAIL_MAXIMUM_LENGTH,
  NAME_FIRST_MAXIMUM_LENGTH,
  NAME_LAST_MAXIMUM_LENGTH,
  NAME_HONORIFIC_MAXIMUM_LENGTH,
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_TEACHER,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
} = require("../../constants");

const user = {
  /**
   * Mutation providing a method to self-update user profile information. There are some additional
   * checks on Moderators disallowing them from updating other Moderators or Admins. Admins, on the
   * other hand, have full power.
   * TODO - Email validity check (it's not just for the client these days!!)
   * TODO - Email confirmations (waaaay in the future no doubt!)
   * TODO - Password check (complexity requirements?, trimming, easy password blocking)
   * TODO - Name check (no numerals, no odd punctuation, no emoji, etc)
   * TODO - Honorific check (maybe?)
   * @param parent
   * @param args
   *        userid: ID!
   *        email: String
   *        password: PasswordInput {
   *          new: String
   *          old: String
   *        }
   *        honorific: String
   *        fname: String
   *        lname: String
   * @param ctx
   * @param info
   * @returns PrivateUser!
   */
  async updateUserProfile(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      status: USER_STATUS_NORMAL,
      action: "updateUserProfile",
    });

    const targetUserData = await ctx.db.query.user({ where: { id: args.userid } }, `
      {
        id
        type
        password
      }
    `);

    // Check the User exists.
    if (targetUserData === null) {
      throw new UserNotFound(args.userid);
    }

    // A Student or Teacher can update their own info and moderators or better can as well.
    if (callingUserData.id !== targetUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "updateUserProfile");
    }

    // TODO - Password resetting will be a different mutation someday.
    // Students, teachers, AND moderators must supply their old password to change their password or
    // email. Moderators can change the password or email of students and teachers without the old
    // password. Admins can change everyone's password or email without old passwords, even other
    // admins. Other rules for moderators still apply below with moderatorPermissionsCheck().
    if (args.password && args.password.new &&
      (
        callingUserData.type < USER_TYPE_MODERATOR ||
        (targetUserData.type === USER_TYPE_MODERATOR && callingUserData.type < USER_TYPE_ADMIN)
      ) &&
      (!args.password.old || !await bcrypt.compare(args.password.old, targetUserData.password))) {
      throw new ExistingPasswordRequired("set a new password");
    }
    if (args.email &&
      (
        callingUserData.type < USER_TYPE_MODERATOR ||
        (targetUserData.type === USER_TYPE_MODERATOR && callingUserData.type < USER_TYPE_ADMIN)
      ) &&
      (
        !args.password || (args.password && (!args.password.old ||
        !await bcrypt.compare(args.password.old, targetUserData.password)))
      )) {
      throw new ExistingPasswordRequired("update email address");
    }

    // Do some Moderator checking...
    moderatorPermissionsCheck(targetUserData, callingUserData, args, "updateUserProfile");

    // Construct the update payload carefully...
    const dataPayload = {};

    // Email and passwords cannot be made blank.
    if (args.email) dataPayload.email = args.email;
    if (args.password && args.password.new) {
      dataPayload.password = await bcrypt.hash(args.password.new, BCRYPT_SALT_LENGTH);
    }

    // First and last names can be made blank.
    if (args.fname !== undefined) dataPayload.fname = args.fname;
    if (args.lname !== undefined) dataPayload.lname = args.lname;

    // Only allow honorifics for teachers.
    if (args.honorific !== undefined && targetUserData.type === USER_TYPE_TEACHER) {
      dataPayload.honorific = args.honorific;
    }

    // Enforce input limits.
    if (args.email && args.email.length > EMAIL_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("email", EMAIL_MAXIMUM_LENGTH);
    }
    if (args.password && args.password.new && args.password.new.length < PASSWORD_MINIMUM_LENGTH) {
      throw new InputBelowMinimum("password", PASSWORD_MINIMUM_LENGTH);
    }
    if (args.password && args.password.new && args.password.new.length > PASSWORD_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("password", PASSWORD_MAXIMUM_LENGTH);
    }
    if (dataPayload.fname && dataPayload.fname.length > NAME_FIRST_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("fname", NAME_FIRST_MAXIMUM_LENGTH);
    }
    if (dataPayload.lname && dataPayload.lname.length > NAME_LAST_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("lname", NAME_LAST_MAXIMUM_LENGTH);
    }
    if (dataPayload.honorific && dataPayload.honorific.length > NAME_HONORIFIC_MAXIMUM_LENGTH) {
      throw new InputAboveMaximum("honorific", NAME_HONORIFIC_MAXIMUM_LENGTH);
    }

    // Fire off the mutation!
    return ctx.db.mutation.updateUser({
      where: { id: args.userid },
      data: dataPayload,
    }, info);
  },


  /**
   * Mutation providing administrative-style updates to a User row. This includes changing the
   * type, status, and flags of a User. There are some additional checks on Moderators disallowing
   * them from updating other Moderators or Admins. Admins, on the other hand, have full power.
   * @param parent
   * @param args
   *        userid: ID!
   *        type: Int
   *        status: Int
   *        flags: Int
   * @param ctx
   * @param info
   * @returns PrivateUser!
   */
  async updateUserStates(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "updateUserStates",
    });

    const targetUserData = await ctx.db.query.user({ where: { id: args.userid } }, `
      {
        id
        type
      }
    `);

    // Check the User exists.
    if (targetUserData === null) {
      throw new UserNotFound(args.courseid);
    }

    // A Student or Teacher can update their own info and moderators or better can as well.
    // I KNOW THIS IS POINTLESS (because of checkAuth above) but it helps me sleep at night!
    if (callingUserData.id !== targetUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "updateUserStates");
    }

    // Do some Moderator checking...
    moderatorPermissionsCheck(targetUserData, callingUserData, args, "updateUserStates");

    // Construct the update payload carefully...
    const dataPayload = {};
    if (args.type) dataPayload.type = args.type;
    if (args.status) dataPayload.status = args.status;
    if (args.flags) dataPayload.flags = args.flags;

    // Only Teachers can have honorifics, remove it if they were once a teacher. ...This will never
    // happen...
    if (targetUserData.type === USER_TYPE_TEACHER && args.type && args.type !== USER_TYPE_TEACHER) {
      dataPayload.honorific = null;
    }

    // Fire off the mutation!
    return ctx.db.mutation.updateUser({
      where: { id: args.userid },
      data: dataPayload,
    }, info);
  },
};


/**
 * Helper function places limits on the powers of Moderators.
 * @param targetUserData
 * @param callingUserData
 * @param args
 * @param actionName
 */
function moderatorPermissionsCheck(targetUserData, callingUserData, args, actionName) {
  // A moderator cannot affect other moderators or admins. But they can change themselves.
  if (callingUserData.id !== targetUserData.id &&
    targetUserData.type >= USER_TYPE_MODERATOR &&
    callingUserData.type < USER_TYPE_ADMIN) {
    throw new AuthError("Only Admins can change other Moderators or better", actionName);
  }

  if (args.type) {
    // Only Admins can change a User's type to Moderator or better.
    if (args.type >= USER_TYPE_MODERATOR && callingUserData.type < USER_TYPE_ADMIN) {
      throw new AuthError("Only Admins can make Moderators or better", actionName);
    }
  }
}

module.exports = { user };
