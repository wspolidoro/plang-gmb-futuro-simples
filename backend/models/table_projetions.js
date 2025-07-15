const Sequelize = require('sequelize');
const database = require('../db/db');
const Proposal = require('./table_proposal');
require('dotenv').config();

const Projetions = database.define('projetions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    proposalId: {
        type: Sequelize.INTEGER
    },

    newVolume: {
        type: Sequelize.INTEGER
    },

    newRevenue: {
        type: Sequelize.FLOAT
    },

    extraRevenue: {
        type: Sequelize.FLOAT
    },

    currentRevenue: {
        type: Sequelize.FLOAT
    },

    yearlyExtra: {
        type: Sequelize.FLOAT
    },

    createdAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        unique: true,

    },

    updatedAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        unique: false,

    }
},
    {
        freezeTableName: true,
        timestamps: true,
    },


);

Proposal.hasMany(Projetions, { foreignKey: 'proposalId',as: 'projections'});
Projetions.belongsTo(Proposal, {foreignKey: 'proposalId',as: 'proposal'});

module.exports = Projetions;