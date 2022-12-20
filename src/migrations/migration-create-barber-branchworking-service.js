"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    await queryInterface.createTable("barber_branchworking_service", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      barberId: {
        type: Sequelize.INTEGER,
      },
      branchworkingId: {
        type: Sequelize.INTEGER,
      },
      serviceId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("barber_branchworking_service");
  },
};
