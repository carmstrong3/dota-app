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
  return Matchup;
};
