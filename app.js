const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database.js');

const Company=require('./models/company.js');
const User=require('./models/user.js');
const Review=require('./models/review.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1);
        if (user) {
            req.user = user;
        }
        next();
    } catch (err) {
        console.log(err);
    }
});

const reviewroutes=require('./routes/review.js');
const userroutes=require('./routes/user.js');

app.use(reviewroutes);
app.use(userroutes);

//associations

User.hasMany(Review);
Review.belongsTo(User);

Company.hasMany(Review);
Review.belongsTo(Company);

(async () => {
    try {
        await sequelize.sync();
        let user = await User.findByPk(1);
        if (!user) {
            user = await User.create({ name: 'venkata', email: 'reddy@gmail.com' });
        }
        //console.log('Available methods on user instance:', Object.keys(user.__proto__)); // Log available methods
        //console.log('Available methods on user instance:', Object.keys(cart.__proto__));
        app.listen(3000);
    } catch (err) {
        console.log(err);
    }
})();