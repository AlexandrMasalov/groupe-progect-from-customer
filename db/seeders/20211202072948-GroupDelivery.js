'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
     await queryInterface.bulkInsert('GroupDeliveries', [
      { user_id: 3, user2_id: 8, user3_id: 9 },
      { user_id: 3, user2_id: 8, user3_id: 10 },
      { user_id: 3, user2_id: 9, user3_id: 10 },
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
