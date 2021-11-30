'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupDelivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Delivery, { foreinkey: 'groupeDelivery_id'}),
      this.hasMany(models.User, { foreinkey: 'user_id'})
    }
  };
  GroupDelivery.init({
    data: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupDelivery',
  });
  return GroupDelivery;
};
