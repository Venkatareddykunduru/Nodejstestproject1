const Review = require('../models/review.js');
const User = require('../models/user.js');
const Company = require('../models/company.js');

// Get reviews by company name
exports.getreviews = async (req, res, next) => {
    const companyName = req.params.companyname;

    try {
        const company = await Company.findOne({
            where: { companyname: companyName },
            include: [
                {
                    model: Review,
                    include: [User]
                }
            ]
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const reviews = company.reviews; // Use lowercase 'r' for reviews

        // Calculate the average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (reviews.length > 0) ? (totalRating / reviews.length) : 0;

        const response = {
            companyName: company.companyname,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
            averageRating: averageRating.toFixed(2),
            reviews: reviews
        };

        console.log('Successfully retrieved reviews');
        res.status(200).json(response);
    } catch (err) {
        console.log('Error getting reviews for company: ' + err);
        res.status(500).json({ error: 'Error getting reviews for company' });
    }
};
