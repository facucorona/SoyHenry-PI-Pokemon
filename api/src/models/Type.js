const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    id: {
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
