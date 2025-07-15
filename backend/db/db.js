const Sequelize = require('sequelize');

//PROD
  const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    timezone: '-03:00', // Ajuste conforme o fuso horário necessário
    //logging: console.log, // Log das consultas SQL
   pool: {
        max: 10, // Máximo de conexões
        min: 2,
        acquire: 30000, // Tempo máximo para adquirir conexão (ms)
        idle: 10000, // Tempo de ociosidade antes de liberar a conexão (ms)
    }, 
}); 

module.exports = conn;