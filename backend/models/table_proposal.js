const Sequelize = require('sequelize');
const database = require('../db/db');
require('dotenv').config();

const proposal = database.define('proposalHistory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    businessName: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    averageTicket: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    monthlyVolume: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    niche: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
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

module.exports = proposal;