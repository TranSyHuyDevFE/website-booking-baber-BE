"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Barber_Branchworking_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barber_Branchworking_service.init(
    {
      barberId: DataTypes.INTEGER,
      branchworkingId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Barber_Branchworking_service",
    }
  );
  return Barber_Branchworking_service;
};
