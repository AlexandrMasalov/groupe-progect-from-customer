'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, { foreinkey: 'delivery_id'}),
      this.hasOne(models.GroupDelivery, { foreinkey: 'groupDelivery_id'})
    }
  };
  Delivery.init({
    data: DataTypes.STRING,
    groupDelivery_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};
