const mongoose = require('mongoose');

const crsThirdpartySchema = new mongoose.Schema({
    VendorName: { type: String, required: true },
    high_risk_domain: { type: Boolean, required: true },
    first_vs_third_party: { type: String, required: true },
    Review_Priority: { type: String, required: true }
}, { collection: 'test_crs_thirdparty' });

const CrsThirdparty = mongoose.model('CrsThirdparty', crsThirdpartySchema);
module.exports = CrsThirdparty;
