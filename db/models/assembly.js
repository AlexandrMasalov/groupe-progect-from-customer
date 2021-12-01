'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assembly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Order, { foreignKey: 'assembly_id'}),
      this.belongsTo(models.GroupAssembly, { foreignKey: 'groupAssembly_id'})

    }
  };
  Assembly.init({
    data: DataTypes.STRING,
    groupAssembly_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Assembly',
  });
  return Assembly;
};
