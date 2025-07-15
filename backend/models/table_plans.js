const Sequelize = require('sequelize');
const database = require('../db/db');
require('dotenv').config();

const Planos = database.define('plans', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    planName: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    planValue: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    setup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    highlighted: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    features: {
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

module.exports = Planos;