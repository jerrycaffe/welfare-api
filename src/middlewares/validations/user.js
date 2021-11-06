import {
  validate,
  toLowerCaseAndTrim,
  decodeToken,
  displayError,
} from "../../utils";
import UserServices from "../../services/User";

const passwordFormat =
  "regex:/S*(S*([a-zA-Z]S*[0-9])|([0-9]S*[a-zA-Z]))S*/"; /** Password must have Alphabet and a number i.e. alphanumeric */
const phoneNumberFormat = "regex:/^[0-9]+$/";

/**
 * validate user sign up endpoint
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Function} validate - call validate function
 */
export const validateCreateUser = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);

  req.formattedValues = formattedValues;
  const { lastName, firstName } = formattedValues;
  const { password, phoneNumber } = req.body;
  const data = {
    phoneNumber,
    lastName,
    firstName,
    password,
  };
  const createUserRule = {
    phoneNumber: ["required", "size:11", phoneNumberFormat],
    lastName: ["required"],
    firstName: ["required", "alpha"],
    password: ["required", "min:8", passwordFormat],
  };

  validate(data, createUserRule, res, next);
};

/**
 * validate user login endpoint
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @param {Object} next - call next function
 * @returns {Function} validate - call validate function
 */
export const validateUserLogin = (req, res, next) => {
  const { password, phoneNumber } = req.body;

  const data = {
    phoneNumber,
    password,
  };

  const loginRules = {
    phoneNumber: ["required", "min:10", phoneNumberFormat],
    password: ["required", "min:8", passwordFormat],
  };
  validate(data, loginRules, res, next);
};

/**
 *  verify login user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} null
 */
export const verifyUser = (req, res, next) => {
  try {
    const UserServicesInstance = new UserServices();
    let token;
    const authHeader = req.header("authorization");
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
      const { id } = decodeToken(token);
      const userExist = UserServicesInstance.getUserById(id);
      if (!(userExist instanceof Error)) {
        req.userId = id;
        next();
      }
    }
  } catch (error) {
    const err = new Error("Unauthorized");
    return displayError(err, res, 401);
  }
};
