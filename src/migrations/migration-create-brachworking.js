"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    await queryInterface.createTable("Branch_working", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      descriptionMarkDown: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.Sequelize.BLOB("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Branch_working");
  },
};
