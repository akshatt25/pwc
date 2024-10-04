const mongoose = require('mongoose');

const crsAnalyticsSchema = new mongoose.Schema({
    VendorName: { type: String, required: true },
    high_risk_domain: { type: String, required: true },
    first_vs_third_party: { type: String, required: true },
    Review_Priority: { type: String, required: true }
}, { collection: 'test_crs_analytics' });




const CrsAnalytics = mongoose.model('test_crs_analytics', crsAnalyticsSchema);
module.exports = CrsAnalytics;
