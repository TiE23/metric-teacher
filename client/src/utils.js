import md5 from "md5";
import jwt_decode from "jwt-decode";  // eslint-disable-line camelcase
import isEmail from "validator/lib/isEmail";
import mergeWith from "lodash/mergeWith";
import isPlainObject from "lodash/isPlainObject";
import isObject from "lodash/isObject";
import forEach from "lodash/forEach";
import isEmpty from "lodash/isEmpty";

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
  // The use of isPlainObject should disable merging of arrays, so keep that in mind.
  if (isPlainObject(objValue) && isPlainObject(srcValue)) {
    return mergeWith(objValue, srcValue, mergeCustomizer);
  }
  return srcValue || objValue;
};


/**
 * Find an object by the parentId and using the targetAddress define a new value (or overwrite an
 * old one).
 *
 * Ex:  const data = { users: [{ id: "user1", fname: "John", lname: "Doe" }] };
 *      cacheNewObject(data, "user1", "lname", "Connor");
 *      // data: { users: [{ id: "user1", fname: "John", lname: "Connor" }] }
 *      const data2 = { a: { id: "a1", b: { c: "cat" } } };
 *      cacheNewObject(data2, "a1", "b.c", "dog");
 *      // data2: { a: { id: "a1", b: { c: "dog" } } }
 *      const data3 = { a: { id: "a1", b: {} } };
 *      cacheNewObject(data3, "a1", "b.c", ["dog"]);
 *      // data3: { a: { id: "a1", b: { c: ["dog"] } } }
 *
 * @param data
 * @param parentId
 * @param targetAddress
 * @param newValue
 * @param safe - false, set to true to prevent overwriting existing values
 * @returns {boolean}
 */
const cacheNewObject = (data, parentId, targetAddress, newValue, safe = false) => {
  const findResult = findRecursive(data, object => object.id === parentId);
  if (!findResult) return false;

  // Note: targetParentAddress ONLY becomes the address AFTER the targetKey has been pop()'d.
  const targetParentAddress = typeof targetAddress === "string" ?
    targetAddress.split(".") : targetAddress;
  const targetKey = targetParentAddress.pop();
  if (!targetKey) return false; // There was no key provided.
  const targetParentObject = navigateObjectDots(findResult.target, targetParentAddress);
  if (targetParentObject[targetKey] && safe) return false;
  targetParentObject[targetKey] = newValue;
  return true;
};


/**
 * Find an object by the targetId and update the contents of that object with a merge.
 *
 * Ex:  const data = { users: [{ id: "user1", fname: "John" }] }
 *      cacheUpdateObject(data, "user1", { fname: "Sarah", lname: "Connor" })
 *      // data: { users: [{ id: "user1", fname: "Sarah", lname: "Connor" }] }
 *      const data2 = { a: { id: "a1", b: { c: "cat" } } };
 *      cacheNewObject(data2, "a1", "dog", "b.c");
 *      // data2: { a: { id: "a1", b: { c: "dog" } } }
 *
 * @param data
 * @param targetId
 * @param updateObject
 * @param targetAddress - leave unset to update the targetId object
 * @returns {boolean}
 */
const cacheUpdateObject = (data, targetId, updateObject, targetAddress = []) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  const targetObject = navigateObjectDots(findResult.target, targetAddress);
  if (!targetObject) return false;  // Object was not found at this address.
  mergeWith(targetObject, updateObject, mergeCustomizer);
  return true;
};


/**
 * Find an object by the targetId and delete it from existence.
 * There is a single limitation: Due to strict JavaScript rules the targetId cannot be the root
 * object. I think this isn't such a big problem as I cannot imagine ever needing to do this.
 *
 * Ex:  const data = { user: { id: "user1", fname: "John" } };
 *      cacheDeleteObject(data, "user1");
 *      // data: { user: {} }
 *
 * Works for targets in Arrays as well!
 * Ex:  const data = { users: [{ id: "user1", fname: "John" }] };
 *      cacheDeleteObject(data, "user1");
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
 * Ex:  const data = { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23] };
 *      cachePushIntoArray(data, "user1", "favoriteNumbers", 99);
 *      // data: { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23, 99] }
 *
 * @param data
 * @param targetId
 * @param targetAddress
 * @param newValue
 * @returns {boolean}
 */
const cachePushIntoArray = (data, targetId, targetAddress, newValue) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  const targetArray = navigateObjectDots(findResult.target, targetAddress);
  if (!targetArray) return false;
  if (!Array.isArray(targetArray)) return false;
  targetArray.push(newValue);
  return true;
};


/**
 * Find if a target object by their ID alone or a child by targetAddress and a parent ID exists.
 *
 * Ex:  const data = { id: "root", cars: [{ id: "1", name: "Ford" }, { id: "2", name: "VW" }] }
 *      cacheTargetExists(data, "1")
 *      // True - "Ford"
 *      cacheTargetExists(data, "root", "cars")
 *      // True - "[{ id: "1", name: "Ford" }, { id: "2", name: "VW" }]"
 *
 * @param data
 * @param targetId
 * @param targetAddress
 * @returns {boolean}
 */
const cacheTargetExists = (data, targetId, targetAddress = []) => {
  const findResult = findRecursive(data, object => object.id === targetId);
  if (!findResult) return false;
  const targetObject = navigateObjectDots(findResult.target, targetAddress);
  if (!targetObject) return false;  // Object was not found at this address.
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

  // In JS arrays are also objects.
  if (typeof target === "object") {
    const isArray = Array.isArray(target);
    const iterable = isArray ? target : Object.keys(target);
    forEach(iterable, (key) => {  // eslint-disable-line consistent-return
      const value = isArray ? key : target[key];
      if (typeof value === "object") {
        result = findRecursive(value, predicate, target, key);
        if (result) { // The object was FOUND. This is the base case.
          return false; // Stop the forEach loop.
        }
      }
    });
  }

  return result;
};


/**
 * Hacky but elegant recursive method to navigate objects with a string in dot notation or array of
 * keys.
 *
 * Ex:  const object = { a: { b: { c: "cat" } } };
 *      navigateObjectDots(object, "a");
 *      // { b: { c: "cat" } }
 *      navigateObjectDots(object, "a.b.c");
 *      // "cat"
 *      navigateObjectDots(object, "a.b.c.2");
 *      // "t" (String digits work for arrays!)
 *      navigateObjectDots(object, "a.foo");
 *      // undefined
 *      navigateObjectDots(object, "a.b.c.foo.bar");
 *      // undefined
 *
 * @param object
 * @param address
 * @returns {*}
 */
const navigateObjectDots = (object, address) => {
  if (address.length === 0) {
    return object;
  }

  const addresses = typeof address === "string" ? address.split(".") : address;
  const currentAddress = addresses.shift();
  const currentObject = object[currentAddress];
  if (currentObject !== undefined) {
    return navigateObjectDots(currentObject, addresses);
  }
  return currentObject;
};


/**
 * Simple function shallow copies the content of an object skipping any values that are objects.
 * This is essentially the opposite of a recursive copy of an object.
 *
 * @param data
 */
const rootCopy = (data) => {
  const topCopy = {};

  forEach(data, (value, key) => {
    if (!isObject(value)) {
      topCopy[key] = value;
    }
  });

  return topCopy;
};


/**
 * Capitalize the first letter of a string.
 * @param string
 * @returns {string}
 */
const firstLetterCap = (string) => {
  if (string.length === 0) return string;
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};


/**
 * Very simple question text grabber. Just skips
 * @param string
 * @returns {*}
 */
const questionTextGrabber = (string) => {
  const squareBracketIndex = string.indexOf("[");
  if (squareBracketIndex === -1) return string;
  return string.slice(0, squareBracketIndex).trim();
};


/**
 * Very simple string truncator.
 * Ex: ("Hello World!", 9) returns "Hello..."
 *      --> That's 8 characters because it won't return "Hello ..."
 * @param string
 * @param length
 * @param trunc
 * @returns {String}
 */
const stringTruncator = (string, length, trunc = "...") => {
  if (length <= 0) return "";
  if (length <= trunc.length) return trunc.slice(0, length);
  const trimmedString = string.trim();
  if (trimmedString.length <= length) return trimmedString;
  return trimmedString.slice(0, length - trunc.length).trimEnd() + trunc;
};


/**
 * An extension to lodash's isEmpty function where it'll say an object is empty if it is
 * functionally empty. As in, it can have multiple keys and still be empty if it has no values.
 *
 * Ex:  utils.isEmptyRecursive({ a: null })                                 // True
 *      utils.isEmptyRecursive({ a: { b: null } })                          // True
 *      utils.isEmptyRecursive({ a: { b: [] } })                            // True
 *      utils.isEmptyRecursive({ a: { b: [{ b1: null }, { b2: null }] } })  // True
 *      utils.isEmptyRecursive({ a: { b: "boy" } })                         // False
 *      utils.isEmptyRecursive({ a: { b: false } })                         // False (!)
 *
 * @param object
 * @returns {boolean}
 */
const isEmptyRecursive = (object) => {
  if (isEmpty(object)) return true;

  let result = false;

  // In JS arrays are also objects.
  if (typeof object === "object") {
    const isArray = Array.isArray(object);
    const iterable = isArray ? object : Object.keys(object);
    forEach(iterable, (key) => {
      const value = isArray ? key : object[key];

      // Recurse on objects/arrays
      if (typeof value === "object") {
        result = isEmptyRecursive(value);
        if (!result) {  // The object was NOT empty, this is the base case.
          return false; // Stop the forEach loop.
        }
      // On non-objects, just confirm it's not null
      } else if (value !== null) {
        result = false;
      }
      return true;
    });
  }

  return result;
};


/**
 * Used by Mastery and Survey scores. Different colors for different scores in proportion to their
 * maximum score.
 * @param currentScore
 * @param maxScore
 * @returns {string}
 */
const scoreProgressColor = (currentScore, maxScore) => {
  const scoreQuarters = maxScore / 4;

  if (currentScore < scoreQuarters) return "red";
  else if (currentScore < scoreQuarters * 2) return "orange";
  else if (currentScore < scoreQuarters * 3) return "yellow";
  else if (currentScore < scoreQuarters * 4) return "olive";
  else return "green";
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
  cacheTargetExists,
  findRecursive,
  navigateObjectDots,
  rootCopy,
  firstLetterCap,
  questionTextGrabber,
  stringTruncator,
  isEmptyRecursive,
  scoreProgressColor,
};
