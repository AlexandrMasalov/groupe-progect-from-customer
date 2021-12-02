const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupAssembly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' }),
      this.belongsTo(models.User, { foreignKey: 'user2_id' }),
      this.belongsTo(models.User, { foreignKey: 'user3_id' }),
      this.hasOne(models.Assembly, { foreignKey: 'groupAssembly_id' });
    }
  }
  GroupAssembly.init({
    user_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    user3_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GroupAssembly',
  });
  return GroupAssembly;
};
