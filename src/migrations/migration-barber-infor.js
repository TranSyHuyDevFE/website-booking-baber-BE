"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    await queryInterface.createTable("Barber_Infor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      barberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serviceId: {
        type: Sequelize.INTEGER,
      },
      branchId: {
        type: Sequelize.INTEGER,
      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provinceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressBranch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameBranch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("Barber_Infor");
  },
};
