const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupDelivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' }),
      this.belongsTo(models.User, { foreignKey: 'user2_id' }),
      this.belongsTo(models.User, { foreignKey: 'user3_id' }),
      this.hasOne(models.Delivery, { foreignKey: 'groupDelivery_id' });
    }
  }
  GroupDelivery.init({
    user_id: DataTypes.INTEGER,
    user2_id: DataTypes.INTEGER,
    user3_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GroupDelivery',
  });
  return GroupDelivery;
};
