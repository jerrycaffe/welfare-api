import model from "../models";
import { comparePassword, hashPassword, tokenGenerator } from "../utils";
import Error from "../utils/ErrorUtils";

/**
 * user services
 */
class UserServices {
  /**
   * initiate user model
   */
  constructor() {
    this.UserModel = model.User;
  }

  /**
   * creates a user
   * @param {*} userData
   * @returns {object} user
   */
  async createUser(userData) {
    try {
      const { firstName, lastName, password, phoneNumber } = userData;
      const hashedPassword = await hashPassword(password);

      const [user, created] = await this.UserModel.findOrCreate({
        where: { phoneNumber },
        defaults: {
          firstName,
          lastName,
          password: hashedPassword,
          phoneNumber,
        },
      });
      if (created) {
        // delete password before returning the added user
        user.password = undefined;
        return {
          success: true,
          data: user,
        };
      }
      throw new Error(
        "Authorisation Error",
        401,
        "Create User is not successful make sure this account is not existing"
      );
    } catch (error) {
      return error;
    }
  }

  /**
   * authenticate user data
   * @param {*} userData
   * @returns {object} user
   */
  async authenticateUser(userData) {
    try {
      const { phoneNumber, password } = userData;
      const user = await this.UserModel.findOne({ where: { phoneNumber } });

      if (!user) {
        throw new Error("Authentication error", 404, "User does not exist");
      }

      if (userData && !comparePassword(user.password, password)) {
        throw new Error(
          "Authentication error",
          400,
          "User credentials are invalid"
        );
      }

      const { id } = user;
      const accessToken = tokenGenerator(id, user.phoneNumber);
      const result = {
        id,
        phoneNumber: user.phoneNumber,
        token: accessToken,
      };
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  /**
   * get user data
   * @param {*} userId
   * @returns {object} user
   */
  async getUserById(userId) {
    try {
      const user = await this.UserModel.findByPk(userId);

      if (!user) {
        throw new Error("Data Error", 404, "User does not exist");
      }
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return error;
    }
  }
}

export default UserServices;
