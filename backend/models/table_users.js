const Sequelize = require('sequelize');
const database = require('../db/db');
require('dotenv').config();

const Usuario = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    email_verified: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    image: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode está vazio.."
            },
        }
    },

    contact: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
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

module.exports = Usuario;