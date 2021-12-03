const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Order, { foreignKey: 'delivery_id' }),
      this.belongsTo(models.GroupDelivery, { foreignKey: 'groupDelivery_id' });
    }
  }
  Delivery.init({
    date: DataTypes.DATE,
    groupDelivery_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Delivery',
    // timestamps: false,
  });
  return Delivery;
};
