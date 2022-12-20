"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@email.com",
        password: "123456", //hash password
        firstName: "Sy",
        lastName: "Huy",
        address: "Quan 1",
        gender: 1,
        typeRole: "ROLE",
        keyRole: "R1",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
