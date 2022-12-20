"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      }),
        User.belongsTo(models.Allcode, {
          foreignKey: "gender",
          targetKey: "keyMap",
          as: "genderData",
        });
      User.hasOne(models.Markdown, { foreignKey: "barberId" });
      User.hasOne(models.Barber_Infor, { foreignKey: "barberId" });
      User.hasMany(models.Schedule, {
        foreignKey: "barberId",
        as: "barberData",
      });
      User.hasMany(models.Booking, {
        foreignKey: "customerId",
        as: "customerData",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
