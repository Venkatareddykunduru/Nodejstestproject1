const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('nodejstestproject', 'root', 'Lachhi@143', {
    host: 'localhost',
    dialect: 'mysql' // Change this to your database dialect
});

module.exports = sequelize;