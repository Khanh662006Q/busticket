'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, Tickets }) {
      this.belongsTo(Station, {
        foreignKey: 'fromStation', as: 'from',
      });
      this.belongsTo(Station, {
        foreignKey: 'toStation', as: 'to',
      });
      this.hasMany(Tickets, {
        foreignKey: 'tripId', as: 'tickets',
      });
      // define association here
    }
  }
  Trip.init({
    startTime: DataTypes.DATE,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};