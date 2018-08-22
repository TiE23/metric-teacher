import md5 from "md5";
import jwt_decode from "jwt-decode";  // eslint-disable-line camelcase
import isEmail from "validator/lib/isEmail";
import isDecimal from "validator/lib/isDecimal";
import mergeWith from "lodash/mergeWith";
import isPlainObject from "lodash/isPlainObject";
import isObject from "lodash/isObject";
import forEach from "lodash/forEach";
import isEmpty from "lodash/isEmpty";
import deline from "deline";

import normalizeEmail from "validator/lib/normalizeEmail";

import {
  AUTH_TOKEN,
  BAD_PASSWORDS,
  EMAIL_NORMALIZE_OPTIONS,
  EMAIL_SECRET_PREFIXES,
  PASSWORD_MINIMUM_LENGTH,
  UNIT_INITIALISMS,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
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
 * This will not merge arrays.
 * Only allow non-null values to overwrite (namely, I wanted to prevent null from squashing "").
 * @param objValue
 * @param srcValue
 * @returns {*}
 */
const mergeCustomizer = (objValue, srcValue) => {
  // The use of isPlainObject should disable merging of arrays, so keep that in mind.
  if (isPlainObject(objValue) && isPlainObject(srcValue)) {
    return mergeWith(objValue, srcValue, mergeCustomizer);
  }
  if (srcValue !== null && srcValue !== undefined) {
    return srcValue;
  }
  return objValue;
};


/**
 * Find an object by the parentId and using the targetAddress define a new value (or overwrite an
 * old one).
 *
 * All manipulation of data is done by reference, so data objects will be changed.
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
 *      const data4 = { a: { theId: "a1", b: {} } };
 *      cacheNewObject(data4, "a1", "b.c", ["dog"], false, "theId");
 *      // data4: { a: { id: "a1", b: { c: ["dog"] } } }
 *
 * @param data
 * @param parentId
 * @param targetAddress
 * @param newValue
 * @param safe - false, set to true to prevent overwriting existing values
 * @param key - leave unset to search by an object's id property
 * @returns {boolean}
 */
const cacheNewObject = (data, parentId, targetAddress, newValue, safe = false, key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === parentId);
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
 * All manipulation of data is done by reference, so data objects will be changed.
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
 * @param key - leave unset to search by an object's id property
 * @returns {boolean}
 */
const cacheUpdateObject = (data, targetId, updateObject, targetAddress = [], key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === targetId);
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
 * All manipulation of data is done by reference, so data objects will be changed.
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
 * @param key - leave unset to search by an object's id property
 * @returns {boolean}
 */
const cacheDeleteObject = (data, targetId, key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === targetId);
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
 * All manipulation of data is done by reference, so data objects will be changed.
 *
 * Ex:  const data = { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23] };
 *      cachePushIntoArray(data, "user1", "favoriteNumbers", 99);
 *      // data: { user: { id: "user1", fname: "John", favoriteNumbers: [5, 9, 23, 99] }
 *
 * @param data
 * @param targetId
 * @param targetAddress
 * @param newValue
 * @param key - leave unset to search by an object's id property
 * @returns {boolean}
 */
const cachePushIntoArray = (data, targetId, targetAddress, newValue, key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === targetId);
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
 * @param targetAddress - leave unset to check the targetId object
 * @param key - leave unset to search by an object's id property
 * @returns {boolean}
 */
const cacheTargetExists = (data, targetId, targetAddress = [], key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === targetId);
  if (!findResult) return false;
  const targetObject = navigateObjectDots(findResult.target, targetAddress);
  if (!targetObject) return false;  // Object was not found at this address.
  return true;
};


/**
 * Find and retrieve target object by their ID alone or a child by targetAddress and a parent ID.
 *
 * Data is returned by reference, so if you plan to manipulate data be wary if you need to deep
 * clone it first.
 *
 * Ex: const data = { cars: [{ id: "F-150", type: "Truck", make: { id: "make1", name: "Ford"} }] } }
 *      cacheGetTarget(data, "F-150", "make.name")
 *      // "Ford"
 *
 * @param data
 * @param targetId
 * @param targetAddress
 * @param key
 * @returns {*}
 */
const cacheGetTarget = (data, targetId, targetAddress = [], key = "id") => {
  const findResult = findRecursive(data, object => object && object[key] === targetId);
  if (!findResult) return undefined;
  const targetObject = navigateObjectDots(findResult.target, targetAddress);
  return targetObject;
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
  if (target && typeof target === "object") {
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
const navigateObjectDots = (object, address = []) => {
  if (object === null || object === undefined || address.length === 0) {
    return object;
  }

  const addresses = typeof address === "string" ? address.split(".") : address;
  const nextAddress = addresses.shift();
  const nextObject = object[nextAddress];
  return navigateObjectDots(nextObject, addresses);
};


/**
 * Shortcut to navigateObjectDots().
 * My intention is that at some point I'll clean up a lot of ugly space-consuming code.
 * Ex:
 *    props.data && props.data.question && props.data.question.top && props.data.question.top.value
 * becomes...
 *    utils.nod(props.data, "question.top.value")
 * That's just one example, but
 * @param input
 * @param address
 * @returns {*} // Undefined if the object address doesn't exist.
 */
const nod = (input, address) => navigateObjectDots(input, address);


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
  if (typeof string !== "string" || string.length === 0) return string;
  return string.slice(0, 1).toLocaleUpperCase() + string.slice(1);
};


/**
 * Very simple question text grabber. Just skips content found after the first incident of "[".
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
        return false; // Stop the forEach loop.
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


/**
 * Super simple function. You put in your value and your fromUnitWord or toUnitWord object and get
 * the proper string in return.
 * Ex:
 *  utils.unitWorder(1, { singular: "foot", plural: "feet" }) // "1 foot"
 *  utils.unitWorder(1500, { singluar: "meter", plural: "meters" }) // "1,500 meters"
 * @param value
 * @param words
 * @returns {string}
 */
const unitWorder = (value, words) => (
  `${value.toLocaleString()} ${value === 1 ? words.singular : words.plural}`
);


/**
 * Super simple function. You put in your bottom/top range object and your fromUnitWord or
 * toUnitWord object and get the proper string in return.
 * Ex:
 *  utils.rangeWorder(
 *   { bottom: { value: 1 }, top: { value: 3 }, { singular: "foot", plural: "feet" }}
 *  ) // "1-3 feet"
 * @param range
 * @param words
 * @returns {string}
 */
const rangeWorder = (range, words) => (
  `${range.bottom.value.toLocaleString()}-${range.top.value.toLocaleString()} ${range.top.value === 1 ? words.singular : words.plural}`
);


/**
 * Super simple function. You put in your QaUnit object and get the proper string in return.
 * Ex:
 *  utils.choiceWorder({ unit: "lb", value: 10 }) // "10lb"
 *  utils.choiceWorder({ unit: "f", value: 12.5 }) // "12.5°F"
 *  utils.choiceWorder({ unit: "written", written: "The Eiffel tower." } // "The Eiffel tower."
 * @param choice
 * @returns {string}
 */
const choiceWorder = choice => (
  choice.unit === "written" ? `${choice.written}` : `${choice.value.toLocaleString()}${unitInitilizer(choice.unit)}`
);


/**
 * Super simple function. Takes in a standard unit string and returns a slightly better reading
 * unit string in its place. See the constant UNIT_INITIALISMS for more info.
 * @param unit
 * @returns {*}
 */
const unitInitilizer = unit => (
  UNIT_INITIALISMS[unit] ? UNIT_INITIALISMS[unit] : unit
);


/**
 * Takes typical Survey response requirements for the inputted value and returns form errors to
 * report to the user of their failures in life.
 * @param value         (must be a number)
 * @param rangeTop      (must be a number)
 * @param rangeBottom   (must be a number)
 * @param unit
 * @param step          (must be a number)
 * @returns {Array}     (any errors found)
 */
const surveyAnswerValidator = (value, rangeTop, rangeBottom, unit, step) => {
  const formErrors = [];

  // Min/Max requirements.
  const valueString = choiceWorder({ value, unit });

  if (value > rangeTop) {
    formErrors.push(deline`You answer ${valueString} is greater than the acceptable
      maximum value of ${rangeTop}.`);
  }
  if (value < rangeBottom) {
    formErrors.push(deline`Your answer ${valueString} is lower than the acceptable
      minimum value of ${rangeBottom}.`);
  }

  // Step requirements.
  const stepVal = step || 1;
  const stepMod = (value * 100000) % (stepVal * 100000); // Avoid float issues up to 0.0000001
  if (stepMod !== 0) {
    if (stepVal === 1) {
      formErrors.push("Your answer must be a whole number.");
    } else if (stepVal < 1 && value % 1 !== 0) {  // Accept whole numbers, always.
      formErrors.push(deline`Your answer must be a whole number or
        multiple of ${stepVal}.`);
    } else if (stepVal > 1) {
      formErrors.push(`Your answer must be a multiple of ${stepVal}.`);
    }
  }

  return formErrors;
};


/**
 * Explodes an integer into individual flags in a list.
 * Ex: (0) => []; (1) => [1]; (5) => [1, 4]; (7) => [1, 2, 4]
 * @param bits
 * @returns {Array}
 */
const explodeBits = (bits) => {
  let bitsCopy = bits;
  const flags = [];

  let bit = 1;
  while (bitsCopy > 0) {
    if (bitsCopy & bit) {
      flags.push(bit);
      bitsCopy &= ~bit;
    }
    bit <<= 1;
  }

  return flags;
};


/**
 * Implodes a list of flags into a single flag integer.
 * Ex: ([1, 2, 4]) => 7
 * @param bitList
 * @returns {number}
 */
const implodeBits = (bitList) => {
  let flags = 0;
  bitList.forEach((bit) => {
    flags |= bit;
  });

  return flags;
};


/**
 * Loop through a dictionary of flags and the flags value itself and return an array of the
 * descriptions of activated flags.
 * @param flagsDictionary
 * @param flags
 * @returns {String}
 */
const flagDescriber = (flagsDictionary, flags) => {
  const flagDescriptions = [];
  forEach(flagsDictionary, (value, key) => {
    if (flags & key) {
      flagDescriptions.push(`0x0${key.toString(16)}: (${value})`);
    }
  });

  return flagDescriptions.length ? flagDescriptions.join(", ") : "None";
};


/**
 * Custom isDecimal function checks a user's input and will determine if it's a decimal number
 * or not. Unlike just straight isDecimal it won't reject typing a decimal at the end.
 * That is the worst case scenario: a user can type "5." and possibly submit it, but it's not too
 * bad since parseInt() and parseFloat() both read it as 5
 * @param input
 * @returns {*}
 */
const isDecimalTyped = (input) => {
  const stringInput = typeof input === "string" ? input : String(input);
  const dots = stringInput.match(/\./g);
  if (dots && dots.length > 1) {
    return false;
  }
  if (stringInput[stringInput.length - 1] === ".") {
    return isDecimal(stringInput.slice(0, stringInput.length - 1));
  } else {
    return isDecimal(stringInput);
  }
};


/**
 * Little helper function wraps up parseFloat() and parseInt() into a little package. The main
 * difference being that if the input is a blank string it'll return null instead of NaN.
 * @param input
 * @param integer - Set to true to parse as integer or input an integer to serve as the base
 * @returns {*}
 */
const parseNumber = (input, integer = false) => {
  if (input === "") return null;
  return integer ? parseInt(input, (Number.isInteger(integer) && integer) || 10) :
    parseFloat(input);
};


/**
 * Input smoothing function automatically updates a user's input of "." to read "0." so that they
 * can only input "0.5" and not ".5", which would not be accepted on number input forms.
 * Uses lastIndexOf() to prevent returning "0.0.1" after typing ".0.1".
 * @param input
 * @returns {*}
 */
const decimalHelper = input => (
  input.lastIndexOf(".") === 0 ? `0${input}` : input
);


/**
 * "Truthy Zero".
 * Makes the number 0 cast to true. Ints and Floats both work.
 * Because the JSX {value || "Null!"} will return "Null!" on a zero (not null!) I wrote this to
 * help work around that.
 * @param input
 * @returns {boolean}
 */
const t0 = input => !!(input || input === 0);


/**
 * "Truthy Zero Ternary".
 * Because the JSX {(utils.t0(value) ? value : "Null!"} is such a common bit of code I wrote
 * this to shorten it.
 * @param input
 * @param fail
 * @returns {*}
 */
const t0t = (input, fail) => (t0(input) ? input : fail);


/**
 * Basic helper function returns a the value gated between a minimum and maxiumum. Very simple.
 * For example, if your min is 0 and your max is 1000...
 * Example A: 501 returns 501   (no change)
 * Example B: 2501 returns 1000 (maxxed out)
 * Example C: -15 returns 0     (minned in)
 * @param min
 * @param value
 * @param max
 * @returns {number}
 */
const minMax = (min, value, max) => (Math.max(min, Math.min(value, max)));


/**
 * Takes in the qaFormData object found in QuestionViewer.js and outputs an input data object that
 * is acceptable by the updateQuestion mutation.
 * @param qaFormData
 * @returns {*}
 */
const composeQaInputFromFormData = (qaFormData) => {
  const qaInput = {
    questionid: qaFormData.question.basics.id,
    subsubjectid: qaFormData.subSubjectId,
    type: qaFormData.question.basics.type,
    flags: qaFormData.question.basics.flags,
    status: qaFormData.question.basics.status,
    difficulty: qaFormData.question.basics.difficulty,
    media: qaFormData.question.basics.media,
    questioninput: {},
    answerinput: {},
  };

  if (qaFormData.question.basics.type === QUESTION_TYPE_WRITTEN) {
    qaInput.questioninput = {
      text: qaFormData.question.questionData.text,
    };
    qaInput.answerinput = {
      multiplechoiceinput: {
        choicesoffered: qaFormData.question.answerData.multiple.choicesOffered,
        choices: qaFormData.question.answerData.multiple.choices.map(choice => ({
          unit: choice.unit,
          written: choice.unit === "written" ? choice.mixedValue : undefined,
          value: choice.unit !== "written" ? choice.mixedValue : undefined,
        })),
      },
      detail: qaFormData.question.answerData.detail,
    };
  } else if (qaFormData.question.basics.type === QUESTION_TYPE_CONVERSION ||
    qaFormData.question.basics.type === QUESTION_TYPE_SURVEY) {
    qaInput.questioninput = {
      text: qaFormData.question.basics.type === QUESTION_TYPE_SURVEY ?
        qaFormData.question.questionData.text : qaFormData.question.questionData.detail,
      rangeinput: qaFormData.question.questionData.range,
    };
    qaInput.answerinput = {
      conversioninput: {
        accuracy: qaFormData.question.answerData.accuracy,
        unit: qaFormData.question.answerData.unit,
      },
    };
  } else {
    return null;
  }

  return qaInput;
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
  mergeCustomizer,
  cacheNewObject,
  cacheUpdateObject,
  cacheDeleteObject,
  cachePushIntoArray,
  cacheTargetExists,
  cacheGetTarget,
  findRecursive,
  navigateObjectDots,
  nod,
  rootCopy,
  firstLetterCap,
  questionTextGrabber,
  stringTruncator,
  isEmptyRecursive,
  scoreProgressColor,
  unitWorder,
  rangeWorder,
  choiceWorder,
  unitInitilizer,
  surveyAnswerValidator,
  explodeBits,
  implodeBits,
  flagDescriber,
  isDecimalTyped,
  parseNumber,
  decimalHelper,
  t0,
  t0t,
  minMax,
  composeQaInputFromFormData,
};
