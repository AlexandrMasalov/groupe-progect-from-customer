const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, { foreinkey: 'client_id' }),
      this.hasMany(models.Order, { foreinkey: 'client_id' });
    }
  }
  Client.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    surName: DataTypes.STRING,
    adress: DataTypes.STRING,
    telephone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
