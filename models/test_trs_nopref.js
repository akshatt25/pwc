const mongoose = require('mongoose');

const trsNoprefSchema = new mongoose.Schema({
    VendorName: { type: String, required: true },
    high_risk_domain: { type: Boolean, required: true },
    first_vs_third_party: { type: String, required: true },
    Review_Priority: { type: String, required: true }
}, { collection: 'test_trs_nopref' });

const TrsNopref = mongoose.model('TrsNopref', trsNoprefSchema);
module.exports = TrsNopref;
