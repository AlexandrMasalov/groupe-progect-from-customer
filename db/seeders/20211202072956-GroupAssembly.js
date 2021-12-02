'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('GroupAssemblies', [
      { user_id: 4, user2_id: 5, user3_id: 6 },
      { user_id: 4, user2_id: 5, user3_id: 7 },
      { user_id: 4, user2_id: 6, user3_id: 7 },
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
