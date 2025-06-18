'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, Trip}) {
      this.belongsTo(user, {
        foreignKey: 'userId', as: 'user',});
      this.belongsTo(Trip, {
        foreignKey: 'tripId', as: 'trip',
      });
      // define association here
    }
  }
  Tickets.init({
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return Tickets;
};