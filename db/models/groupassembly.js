'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupAssembly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreinkey: 'user_id'}),
      this.belongsTo(models.Assembly, { foreinkey: 'groupeAssembly_id'})
    }
  };
  GroupAssembly.init({
    data: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupAssembly',
  });
  return GroupAssembly;
};
