'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 100] // Name should be between 1 and 255 characters
      }
    },
    address: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 255] // Address should be between 1 and 255 characters
      },
    },
    province: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: true,
        isIn: ['Province1', 'Province2', 'Province3'] // Example provinces, adjust as needed
      },
    }
  }, {
    sequelize,
    modelName: 'Station',
  });
  return Station;
};