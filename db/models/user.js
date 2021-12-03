const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.GroupDelivery, { foreignKey: 'user_id' }),
      this.hasOne(models.GroupDelivery, { foreignKey: 'user2_id' }),
      this.hasOne(models.GroupDelivery, { foreignKey: 'user3_id' }),
      this.hasOne(models.GroupAssembly, { foreignKey: 'user_id' });
      this.hasOne(models.GroupAssembly, { foreignKey: 'user2_id' });
      this.hasOne(models.GroupAssembly, { foreignKey: 'user3_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};
