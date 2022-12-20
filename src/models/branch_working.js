"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch_working extends Model {
    static associate(models) {}
  }
  Branch_working.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkDown: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Branch_working",
      freezeTableName: true,
    }
  );
  return Branch_working;
};
