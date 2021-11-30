'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, { foreinkey: 'order_id'}),
      this.hasOne(models.Furniture, { foreinkey: 'furniture_id'}),
      this.hasOne(models.Assembly, { foreinkey: 'assembly_id'})
      this.hasOne(models.Delivery, { foreinkey: 'delivery_id'}),
      this.belongsTo(models.Client, { foreinkey: 'client_id'})
      
    }
  };
  Order.init({
    number: DataTypes.STRING,
    furniture_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    delivery_id: DataTypes.INTEGER,
    assembly_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
