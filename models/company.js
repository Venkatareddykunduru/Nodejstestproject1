const {DataTypes}=require('sequelize');

const sequelize=require('../util/database.js');

const Company = sequelize.define('company', {
    companyname: {
        type:DataTypes.STRING,
        primaryKey:true
    }
});

module.exports=Company