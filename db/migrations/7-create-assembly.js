module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assemblies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.STRING,
      },
      groupAssembly_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupAssemblies',
          key: 'id',
        },
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Assemblies');
  },
};
