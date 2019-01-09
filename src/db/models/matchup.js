const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});


'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matchup = sequelize.define('Matchup', {
    matchup_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    games_played: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heroId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      unique: true,
      references: {
        model: "Heros", 
        key: "id", 
        as: "heroId",
      }
    }
  }, {});
  Matchup.associate = function(models) {
    // associations can be defined here

    // set relationship between matchup and hero where matchup belongs to hero
/*    Matchup.belongsTo(models.Hero, {
      foreignKey: "heroId",
      onDelete: "CASCADE",
    }); */
  };

  Matchup.addScope("topFiveMatchups", (hero_id) => {
    const Matchup = require("../models").Matchup;
    const attribute = [sequelize.literal('(wins / games_played)')];
    return {
      include: [{
        model: Matchup, all:true
      }],
      where: { 
        heroId: hero_id, 
      },
      limit: `5`,
      order: [['games_played', "DESC"]]
    }
  });


  return Matchup;
};
