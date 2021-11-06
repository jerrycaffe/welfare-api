"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      trackCode: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      dob: DataTypes.DATE,
      phoneNumber: { type: DataTypes.STRING, allowNullL: false, unique: true },
      branchId: DataTypes.UUID,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      stateID: DataTypes.UUID,
      countryId: DataTypes.UUID,
      imgUrl: DataTypes.STRING,
      city: DataTypes.STRING,

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Users");
  },
};
