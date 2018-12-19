'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hero = sequelize.define('Hero', {
    hero_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localized_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary_attr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attack_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {});

  Hero.associate = function(models) {
    // associations can be defined here

    // set relationship between hero and matchup where hero has many matchups
    Hero.hasMany(models.Matchup, {
      foreignKey: "heroId",
      as: "matchups",
    });

  };
  return Hero;
};
