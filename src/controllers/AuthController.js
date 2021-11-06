import UserServices from "../services/User";
import { displayError } from "../utils";

const UserServiceInstance = new UserServices();

export const createNewUser = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    const results = await UserServiceInstance.createUser(userData);

    if (results instanceof Error) {
      return displayError(results, res, results.httpStatusCode);
    }
    return res.status(201).json(results);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const results = await UserServiceInstance.authenticateUser(req.body);

    if (results instanceof Error) {
      return displayError(results, res, results.httpStatusCode);
    }

    return res.status(200).json(results);
  } catch (error) {
    return next(error);
  }
};
