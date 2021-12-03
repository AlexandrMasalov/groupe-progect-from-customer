const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Order, { foreignKey: 'status_id' });
    }
  }
  Status.init({
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
    // timestamps: false,
  });
  return Status;
};
