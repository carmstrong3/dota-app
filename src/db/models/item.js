'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    hero_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    games: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wins: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};
