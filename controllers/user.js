const Company = require('../models/company.js');
const Review = require('../models/review.js');

// Add Review By user
exports.addreview = async (req, res, next) => {
    const { pros, cons, rating, companyname } = req.body;

    try {
        // Find or create the company by name
        let company = await Company.findOne({ where: { companyname: companyname } });
        if (!company) {
            company = await Company.create({ companyname: companyname });
        }

        // Create the review and associate it with the user and the company
        const review = await Review.create({
            pros: pros,
            cons: cons,
            rating: rating
        });

        await review.setUser(req.user); // Associate review with user
        await review.setCompany(company); // Associate review with company

        console.log('Successfully Added Review');
        res.status(200).json({ message: 'Successfully Added Review', review: review });
    } catch (err) {
        console.log('Error in adding review: ' + err);
        res.status(500).json({ message: 'Error in adding review' });
    }
};
