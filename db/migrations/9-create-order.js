module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      furniture_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Furniture',
          key: 'id',
        },
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      delivery_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Deliveries',
          key: 'id',
        },
      },
      assembly_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assemblies',
          key: 'id',
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        }
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
    await queryInterface.dropTable('Orders');
  },
};
