const {DataTypes}=require('sequelize');

const sequelize=require('../util/database.js');

const Review = sequelize.define('review', {
    pros: DataTypes.TEXT,
    cons: DataTypes.TEXT,
    rating: DataTypes.FLOAT
});

module.exports=Review;