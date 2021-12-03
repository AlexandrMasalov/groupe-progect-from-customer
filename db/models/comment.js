'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'client_id'}),
      this.belongsTo(models.Order, { foreignKey: 'order_id'})
    }
  };
  Comment.init({
    author: DataTypes.STRING,
    body: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
    // timestamps: false,
  });
  return Comment;
};
