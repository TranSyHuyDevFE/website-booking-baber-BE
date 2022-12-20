"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    static associate(models) {
      Markdown.belongsTo(models.User, { foreignKey: "barberId" });
    }
  }
  Markdown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      barberId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      branchworkingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Markdown",
    }
  );
  return Markdown;
};
