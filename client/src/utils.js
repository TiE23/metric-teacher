import md5 from "md5";
import jwt_decode from "jwt-decode";  // eslint-disable-line camelcase
import isEmail from "validator/lib/isEmail";
import mergeWith from "lodash/mergeWith";
import forEach from "lodash/forEach";

import normalizeEmail from "validator/lib/normalizeEmail";

import {
  AUTH_TOKEN,
  BAD_PASSWORDS,
  EMAIL_NORMALIZE_OPTIONS,
  EMAIL_SECRET_PREFIXES,
  PASSWORD_MINIMUM_LENGTH,
} from "./constants";

// TODO better token management
// Storing tokens in local storage has issues for production applications because they are at risk
// of XSS attacks.
// See: https://web.archive.org/web/20180414172816/https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

/**
 * Write the token string to local storage.
 * @param token
 */
const writeTokenLocalStorage = (token) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(AUTH_TOKEN, token);  // eslint-disable-line no-undef
    return;
  }
  throw new Error("localStorage not available on this browser!");
};


/**
 * Remove the token string from local storage.
 */
const removeTokenLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);  // eslint-disable-line no-undef
    return;
  }
  throw new Error("localStorage not available on this browser!");
};


/**
 * Read the token string from local storage. If not found, returns null
 * @returns {string | null}
 */
const readTokenLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN);  // eslint-disable-line no-undef
  }
  throw new Error("localStorage not available on this browser!");
};


/**
 * Feed this function your query (and the data, as it may be named differently)
 * and it'll quickly return whether it's OK to continue.
 * @param query
 * @param data
 * @returns boolean
 */
const queryOK = (query, data) => (
  !!query && !!data && !query.loading && !query.error
);


/**
 * This is a tricky little function that will allow me to whitelist emails I own for infinite email
 * addresses (in particular, the use of Gmail + signs) for testing purposes. To keep my emails
 * protected from public scrutiny I use MD5 hashes. Anyone else who tries to use an infinite email
 * (at least those provided by gmail, outlook, yahoo, and icloud) will be turned away. But if I can
 * recognize an email I own by grabbing the first part (ex: johndoe+123@gmail.com gets "johndoe")
 * and running it through MD5 hash and it matches a white list I have defined, then I'll allow
 * whatever I want. But I will always convert toLowerCase() just to keep sane.
 * @param email
 * @returns {string}
 */
const customNormalizeEmail = (email) => {
  const plusLoc = email.indexOf("+");
  if (plusLoc !== -1) {
    const emailPrefixMd5 = md5(email.slice(0, plusLoc));
    if (EMAIL_SECRET_PREFIXES.includes(emailPrefixMd5)) {
      return email.toLowerCase();
    }
  }
  return normalizeEmail(email, EMAIL_NORMALIZE_OPTIONS);
};


/**
 * Grabs the token from local storage and parses it for the payload of user data.
 * @returns {*}
 */
const checkJWT = () => {
  const token = readTokenLocalStorage();
  if (token) {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  }
  return null;
};


/**
 * Use this function to prevent users from even visiting a section of the website before the server
 * rejects them.
 *  NOTE: If you make changes to this you should also STRONGLY consider making the changes to the
 * server's checkAuth function located in server/src/utils.js.
 * @param callingUserData
 * @param permissions
 * - type         Mixed, can be an int (MINIMUM user type allowed), an array of APPROVED
 *                  user types, or null, indicating that anonymous requests are welcome.
 *                  "Why support anonymous?" you ask, "Just don't have an auth check for requests
 *                  that are public!" I have this because running this function before each request
 *                  can still allow me to reject banned users just to be spiteful. >:)
 *                  If simply the user must be logged in just set to USER_TYPE_STUDENT.
 * - status       Mixed, can be an int (MAXIMUM status value allowed) or an array of
 *                  approved statuses. If null will allow any value
 * - flagExclude  Int, pass bitwise flags that are NOT allowed. Leave null to ignore.
 * - flagRequire  Int, include bitwise flags that are REQUIRED. Leave null to ignore.
 * - action       String, optional descriptive text that will display in the AuthError message.
 *                  Example, if you pass "query teachersList" the error could say:
 *                  "Not authorized to query teachersList. Reason: User type '0' insufficient."
 * @returns {{approval: boolean, rejectionReasons: Array}}
 */
const checkAuth = (callingUserData, permissions = {
  type: null,
  status: null,
  flagExclude: null,
  flagRequire: null,
  action: null,
}) => {
  if (!callingUserData) {
    return { approval: false, rejectionReasons: ["User must be logged in. Could not read user token."] };
  }

  // This is how we track in what ways the user is rejected if they are rejected.
  let approval = true;
  const rejectionReasons = [];

  // Check type. If null, do not check anything.
  if (Array.isArray(permissions.type)) {
    if (!permissions.type.includes(callingUserData.type)) {
      approval = false;
      rejectionReasons.push(`User type '${callingUserData.type}' disallowed.`);
    }
  } else if (Number.isInteger(permissions.type)) {
    if (callingUserData.type < permissions.type) {
      approval = false;
      rejectionReasons.push(`User type '${callingUserData.type}' insufficient.`);
    }
  }

  // Check status. If null, do not check anything.
  if (Array.isArray(permissions.status)) {
    if (permissions.status.indexOf(callingUserData.status) === -1) {
      approval = false;
      rejectionReasons.push(`User status '${callingUserData.status}' disallowed.`);
    }
  } else if (Number.isInteger(permissions.status)) {
    if (callingUserData.status < permissions.status) {
      approval = false;
      rejectionReasons.push(`User status '${callingUserData.status}' insufficient.`);
    }
  }

  // Check flags (excluded flags)
  if (permissions.flagExclude) {
    if (callingUserData.flags & permissions.flagExclude) {
      approval = false;
      rejectionReasons.push("User marked with disallowed flags.");
    }
  }

  // Check flags (required flags)
  if (permissions.flagRequire) {
    if ((callingUserData.flags & permissions.flagRequire) !== permissions.flagRequire) {
      approval = false;
      rejectionReasons.push("User not marked with required flags.");
    }
  }

  return { approval, rejectionReasons };
};


/**
 * Tricky little system that provides a common place to enforce rules during login, signup, and
 * when editing user details.
 * @param inputForm
 * @param inputChecked
 * @returns {Array}
 */
const userDetailFormValidator = (inputForm, inputChecked) => {
  const defaultForm = {
    fname: "",
    lname: "",
    honorific: "",
    email: {
      new: "",
      old: "",
    },
    password: {
      new: "",
      old: "",
    },
  };

  const defaultChecked = {
    fname: false,
    lname: false,
    honorific: false,
    email: {
      new: false,
      old: false,
    },
    password: {
      new: false,
      old: false,
    },
  };

  const form = defaultForm;
  mergeWith(form, inputForm, mergeCustomizer);
  const checked = { ...defaultChecked, ...inputChecked };

  const errors = [];

  if (checked.fname && !form.fname.trim()) errors.push("First name required");
  if (checked.lname && !form.lname.trim()) errors.push("Last name required");
  if (checked.honorific && !form.honorific.trim()) errors.push("Honorific required");

  // New email requirements
  if (checked.email.new && !form.email.new.trim()) errors.push("Email required");
  else if (checked.email.new && !isEmail(form.email.new)) errors.push("Email invalid");
  else if (checked.email.new) {
    const normalizedEmail = customNormalizeEmail(form.email.new);
    if (isEmail(form.email.new) && normalizedEmail !== form.email.new.toLowerCase()) {
      errors.push(`Please normalize your email to "${normalizedEmail}"`);
    }
  }

  // Old email requirements
  if (checked.email.old && !form.email.old.trim()) errors.push("Email required");

  // New password requirements
  if (checked.password.new && form.password.new.trim().length < PASSWORD_MINIMUM_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`);
  }
  if (checked.password.new && BAD_PASSWORDS.includes(form.password.new.toLowerCase())) {
    errors.push("Password is far too common. Please try a better password!");
  }

  if (checked.password.old && !form.password.old.trim()) {
    errors.push("Password required");
  }

  return errors;
};


/**
 * Customizer function for mergeWith. See https://lodash.com/docs/4.17.10#mergeWith
 * Recursive trick merges objects together.
 * Only allow truthy values to overwrite (namely, I want to prevent null from squashing "").
 * @param objValue
 * @param srcValue
 * @returns {*}
 */
const mergeCustomizer = (objValue, srcValue) => {
  if (typeof objValue === "object" && typeof srcValue === "object") {
    return mergeWith(objValue, srcValue, mergeCustomizer);
  }
  return srcValue || objValue;
};


/**
 * Find an object by the parentId and using the key define a new value (or overwrite an old one).
 *
 * Ex:  const data = { users: [{ id: "user1", fname: "John", lname: "Doe" }] }
 *      cacheNewObject(data, "user1", "lname", "Connor")
 *      // data: { users: [{ id: "user1", fname: "John", lname: "Connor" }] }
 *
 * @param data
 * @param parentId
 * @param key
 * @param newValue
 * @param safe
 * @returns {boolean}
 */
const cacheNewObject = (data, parentId, key, newValue, safe = false) => {
  const findResult = findRecursive(data, object => object.id === parentId);
  if (!findResult) return false;
  if (findResult.target[key] && safe) return false; // Do not overwrite an existing value.
  findResult.target[key] = newValue;
  return true;
};


/**
 * Find an object by the targetId and update the contents of that object with a merge.
 *
 * Ex:  const data = { users: [{ id: "user1", fname: "John" }] }
 *      cacheUpdateObject(data, "user1", { fname: "Sarah", lname: "Connor" })
 *      // data: { users: [{ id: "user1", fname: "Sarah", lname: "Connor" }] }
 *
 * @param data
 * @param targetId
 * @param updateObject
 * @returns {boolean}
 */
const cacheUpdateObject = (data, targetId, updateObject) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  mergeWith(findResult.target, updateObject, mergeCustomizer);
  return true;
};


/**
 * Find an object by the targetId and delete it from existence.
 * There is a single limitation: Due to strict JavaScript rules the targetId cannot be the root
 * object. I think this isn't such a big problem as I cannot imagine ever needing to do this.
 *
 * Ex:  const data = { user: { id: "user1", fname: "John" } }
 *      cacheDeleteObject(data, "user1")
 *      // data: { user: {} }
 *
 * Works for targets in Arrays as well!
 * Ex:  const data = { users: [{ id: "user1", fname: "John" }] }
 *      cacheDeleteObject(data, "user1")
 *      // data: { users: [] }
 *
 * @param data
 * @param targetId
 * @returns {boolean}
 */
const cacheDeleteObject = (data, targetId) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  if (!findResult.parent) return false; // Cannot delete the root object in Strict Mode!

  if (Array.isArray(findResult.parent)) {
    findResult.parent.splice(findResult.targetKey, 1);
    return true;
  } else if (typeof findResult.parent === "object") {
    delete findResult.parent[findResult.targetKey];
    return true;
  }
  return false;
};


/**
 * Add a value to the target object's specific array value by the target object's ID and the key
 * for the intended array.
 *
 * Ex:  const data = { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23] }
 *      cachePushIntoArray(data, "user1", "favoriteNumbers", 99)
 *      // data: { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23, 99] }
 *
 * @param data
 * @param targetId
 * @param arrayKey
 * @param newValue
 * @returns {boolean}
 */
const cachePushIntoArray = (data, targetId, arrayKey, newValue) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  if (!findResult.target[arrayKey]) return false;
  if (!Array.isArray(findResult.target[arrayKey])) return false;
  findResult.target[arrayKey].push(newValue);
  return true;
};


/**
 * Basic find function iterates through Objects and arrays in a recursive method.
 * Returns the first element that predicate returns truthy for.
 *
 * It returns an object with three values:
 *  target is the found value.
 *  parent is the found value's parent object/array.
 *  targetKey is the found value's key or index in its parent object/array.
 *
 * @param target
 * @param predicate
 * @param parent    You should leave this null, it's for recursion.
 * @param targetKey You should leave this null, it's for recursion.
 * @returns { target, parent, targetKey }
 */
const findRecursive = (target, predicate, parent = null, targetKey = null) => {
  if (predicate(target)) {
    return { target, parent, targetKey };
  }

  // Return statements in the forEach() functions don't work so must do this instead.
  let result = undefined; // eslint-disable-line no-undef-init

  // Arrays in JS are also objects.
  if (typeof target === "object") {
    const isArray = Array.isArray(target);
    const iterable = isArray ? target : Object.keys(target);
    forEach(iterable, (key) => {  // eslint-disable-line consistent-return
      const value = isArray ? key : target[key];
      if (typeof value === "object") {
        result = findRecursive(value, predicate, target, key);
        if (result) {
          return false; // Stop the forEach loop.
        }
      }
    });
  }

  return result;
};


export default {
  writeTokenLocalStorage,
  removeTokenLocalStorage,
  readTokenLocalStorage,
  queryOK,
  customNormalizeEmail,
  checkJWT,
  checkAuth,
  userDetailFormValidator,
  cacheNewObject,
  cacheUpdateObject,
  cacheDeleteObject,
  cachePushIntoArray,
  findRecursive,
};
