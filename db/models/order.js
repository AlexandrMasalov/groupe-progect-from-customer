const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, { foreignKey: 'order_id' }),
      this.belongsTo(models.Furniture, { foreignKey: 'furniture_id' }),
      this.belongsTo(models.Assembly, { foreignKey: 'assembly_id' });
      this.belongsTo(models.Delivery, { foreignKey: 'delivery_id' }),
      this.belongsTo(models.Client, { foreignKey: 'client_id' }),
      this.belongsTo(models.Status, { foreignKey: 'status_id' });
    }
  }
  Order.init({
    number: DataTypes.STRING,
    furniture_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    delivery_id: DataTypes.INTEGER,
    assembly_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
