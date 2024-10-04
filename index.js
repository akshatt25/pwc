const express = require('express');
const mongoose = require('mongoose');
const CrsAnalytics = require('./models/test_crs_analytics');
const NoPrefs = require('./models/test_crs_nopref');
const Targeting = require('./models/test_crs_targeting');
const ThirdParty = require('./models/test_crs_thirdparty');
const TrsAnalytics = require('./models/test_trs_analytics');
const TrsNoPrefs = require('./models/test_trs_nopref');
const TrsTargeting = require('./models/test_trs_targeting');
const TrsThirdParty = require('./models/test_trs_thirdparty');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;

// Online MongoDB connection string
const mongoURI = 'mongodb+srv://akshatt25g:Akshat2523@cluster0.3xhex.mongodb.net/PWC?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected to database:', mongoose.connection.name); // This should print 'PWC'
})
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Function to create pagination route
const createPaginationRoute = (model, route) => {
    app.get(route, async (req, res) => {
        const { page = 1, limit = 10 } = req.query;

        try {
            const data = await model.find()
                .skip((page - 1) * limit)
                .limit(Number(limit));

            const totalDocuments = await model.countDocuments();

            res.json({
                totalDocuments,
                data,
                currentPage: page,
                totalPages: Math.ceil(totalDocuments / limit)
            });
        } catch (error) {
            console.error(`Error fetching data from ${model.modelName}:`, error);
            res.status(500).json({ error: 'Failed to retrieve data' });
        }
    });
};

// Create routes for each CRS collection
createPaginationRoute(CrsAnalytics, '/pwc/crs/analytics');
createPaginationRoute(NoPrefs, '/pwc/crs/no_prefs');
createPaginationRoute(Targeting, '/pwc/crs/targeting');
createPaginationRoute(ThirdParty, '/pwc/crs/third_party');

// Create routes for each TRS collection
createPaginationRoute(TrsAnalytics, '/pwc/trs/analytics');
createPaginationRoute(TrsNoPrefs, '/pwc/trs/no_prefs');
createPaginationRoute(TrsTargeting, '/pwc/trs/targeting');
createPaginationRoute(TrsThirdParty, '/pwc/trs/third_party');
app.get('/pwc/vendor/p1', async (req, res) => {
    try {
        // Aggregate data from each collection
        const collections = [
            CrsAnalytics,
            NoPrefs,
            Targeting,
            ThirdParty,
            TrsAnalytics,
            TrsNoPrefs,
            TrsTargeting,
            TrsThirdParty
        ];

        // Create an array to hold promises for each collection's aggregation
        const results = await Promise.all(collections.map(async (model) => {
            return await model.aggregate([
                {
                    $match: { Review_Priority: "P1" } // Filter by Review Priority
                },
                {
                    $group: {
                        _id: "$VendorName", // Group by VendorName
                        count: { $sum: 1 } // Count occurrences
                    }
                }
            ]);
        }));

        // Flatten the results into a single array
        const allVendorCounts = results.flat();

        // Group by VendorName again to combine counts from different collections
        const finalCounts = allVendorCounts.reduce((acc, curr) => {
            if (!acc[curr._id]) {
                acc[curr._id] = { VendorName: curr._id, count: curr.count };
            } else {
                acc[curr._id].count += curr.count; // Sum counts
            }
            return acc;
        }, {});

        // Convert the object back to an array and sort by count
        const sortedVendors = Object.values(finalCounts).sort((a, b) => b.count - a.count);

        res.json(sortedVendors); // Send the sorted results as the response
    } catch (error) {
        console.error('Error fetching vendor names with review priority P1:', error);
        res.status(500).json({ error: 'Failed to retrieve vendor names' });
    }
});
app.get('/pwc/vendor/p2', async (req, res) => {
    try {
        // Aggregate data from each collection
        const collections = [
            CrsAnalytics,
            NoPrefs,
            Targeting,
            ThirdParty,
            TrsAnalytics,
            TrsNoPrefs,
            TrsTargeting,
            TrsThirdParty
        ];

        // Create an array to hold promises for each collection's aggregation
        const results = await Promise.all(collections.map(async (model) => {
            return await model.aggregate([
                {
                    $match: { Review_Priority: "P2" } // Filter by Review Priority
                },
                {
                    $group: {
                        _id: "$VendorName", // Group by VendorName
                        count: { $sum: 1 } // Count occurrences
                    }
                }
            ]);
        }));

        // Flatten the results into a single array
        const allVendorCounts = results.flat();

        // Group by VendorName again to combine counts from different collections
        const finalCounts = allVendorCounts.reduce((acc, curr) => {
            if (!acc[curr._id]) {
                acc[curr._id] = { VendorName: curr._id, count: curr.count };
            } else {
                acc[curr._id].count += curr.count; // Sum counts
            }
            return acc;
        }, {});

        // Convert the object back to an array and sort by count
        const sortedVendors = Object.values(finalCounts).sort((a, b) => b.count - a.count);

        res.json(sortedVendors); // Send the sorted results as the response
    } catch (error) {
        console.error('Error fetching vendor names with review priority P1:', error);
        res.status(500).json({ error: 'Failed to retrieve vendor names' });
    }
});

app.get('/pwc/vendor/p3', async (req, res) => {
    try {
        // Aggregate data from each collection
        const collections = [
            CrsAnalytics,
            NoPrefs,
            Targeting,
            ThirdParty,
            TrsAnalytics,
            TrsNoPrefs,
            TrsTargeting,
            TrsThirdParty
        ];

        // Create an array to hold promises for each collection's aggregation
        const results = await Promise.all(collections.map(async (model) => {
            return await model.aggregate([
                {
                    $match: { Review_Priority: "P3" } // Filter by Review Priority
                },
                {
                    $group: {
                        _id: "$VendorName", // Group by VendorName
                        count: { $sum: 1 } // Count occurrences
                    }
                }
            ]);
        }));

        // Flatten the results into a single array
        const allVendorCounts = results.flat();

        // Group by VendorName again to combine counts from different collections
        const finalCounts = allVendorCounts.reduce((acc, curr) => {
            if (!acc[curr._id]) {
                acc[curr._id] = { VendorName: curr._id, count: curr.count };
            } else {
                acc[curr._id].count += curr.count; // Sum counts
            }
            return acc;
        }, {});

        // Convert the object back to an array and sort by count
        const sortedVendors = Object.values(finalCounts).sort((a, b) => b.count - a.count);

        res.json(sortedVendors); // Send the sorted results as the response
    } catch (error) {
        console.error('Error fetching vendor names with review priority P1:', error);
        res.status(500).json({ error: 'Failed to retrieve vendor names' });
    }
});


app.get('/pwc/vendor/p4', async (req, res) => {
    try {
        // Aggregate data from each collection
        const collections = [
            CrsAnalytics,
            NoPrefs,
            Targeting,
            ThirdParty,
            TrsAnalytics,
            TrsNoPrefs,
            TrsTargeting,
            TrsThirdParty
        ];

        // Create an array to hold promises for each collection's aggregation
        const results = await Promise.all(collections.map(async (model) => {
            return await model.aggregate([
                {
                    $match: { Review_Priority: "P4" } // Filter by Review Priority
                },
                {
                    $group: {
                        _id: "$VendorName", // Group by VendorName
                        count: { $sum: 1 } // Count occurrences
                    }
                }
            ]);
        }));

        // Flatten the results into a single array
        const allVendorCounts = results.flat();

        // Group by VendorName again to combine counts from different collections
        const finalCounts = allVendorCounts.reduce((acc, curr) => {
            if (!acc[curr._id]) {
                acc[curr._id] = { VendorName: curr._id, count: curr.count };
            } else {
                acc[curr._id].count += curr.count; // Sum counts
            }
            return acc;
        }, {});

        // Convert the object back to an array and sort by count
        const sortedVendors = Object.values(finalCounts).sort((a, b) => b.count - a.count);

        res.json(sortedVendors); // Send the sorted results as the response
    } catch (error) {
        console.error('Error fetching vendor names with review priority P1:', error);
        res.status(500).json({ error: 'Failed to retrieve vendor names' });
    }
});
app.get('/pwc/vendors/high-risk', async (req, res) => {
    try {
        // Array of collections to aggregate data from
        const collections = [
            CrsAnalytics,
            NoPrefs,
            Targeting,
            ThirdParty,
            TrsAnalytics,
            TrsNoPrefs,
            TrsTargeting,
            TrsThirdParty
        ];

        // Create an array to hold promises for each collection's aggregation
        const results = await Promise.all(collections.map(async (model) => {
            return await model.aggregate([
                {
                    $match: { high_risk_domain: "YES" } // Filter by high risk domain
                },
                {
                    $group: {
                        _id: { vendor: "$VendorName", priority: "$Review_Priority" }, // Group by VendorName and Review_Priority
                        count: { $sum: 1 } // Count occurrences
                    }
                }
            ]);
        }));

        // Flatten the results into a single array
        const allVendorCounts = results.flat();

        // Group by VendorName again to combine counts from different collections
        const finalCounts = allVendorCounts.reduce((acc, curr) => {
            const vendorKey = curr._id.vendor; // Extract VendorName
            const priority = curr._id.priority; // Extract Review_Priority
            
            if (!acc[vendorKey]) {
                acc[vendorKey] = { VendorName: vendorKey, counts: { [priority]: curr.count } };
            } else {
                // Sum counts based on priority
                if (!acc[vendorKey].counts[priority]) {
                    acc[vendorKey].counts[priority] = curr.count;
                } else {
                    acc[vendorKey].counts[priority] += curr.count; // Sum counts for the same priority
                }
            }
            return acc;
        }, {});

        // Convert the object back to an array
        const sortedVendors = Object.values(finalCounts);

        res.json(sortedVendors); // Send the sorted results as the response
    } catch (error) {
        console.error('Error fetching vendors with high risk domain:', error);
        res.status(500).json({ error: 'Failed to retrieve high risk vendors' });
    }
});
app.get('/pwc/vendors/third-party', async (req, res) => {
    try {
        // Aggregate data from the ThirdParty collection
        const thirdPartyVendors = await ThirdParty.aggregate([
            {
                $project: {
                    VendorName: 1, // Include VendorName
                    high_risk_domain: 1, // Include high_risk_domain property
                    first_vs_third_party: 1, // Include first_vs_third_party property
                    Review_Priority: 1 // Include Review_Priority property
                }
            }
        ]);

        // Send the result as a JSON response
        res.json(thirdPartyVendors);
    } catch (error) {
        console.error('Error fetching third-party vendors:', error);
        res.status(500).json({ error: 'Failed to retrieve third-party vendors' });
    }
});
app.get('/pwc/summary', async (req, res) => {
    try {
        // Define the models and their corresponding names
        const collections = [
            { model: CrsAnalytics, name: 'CrsAnalytics' },
            { model: NoPrefs, name: 'NoPrefs' },
            { model: Targeting, name: 'Targeting' },
            { model: ThirdParty, name: 'ThirdParty' },
            { model: TrsAnalytics, name: 'TrsAnalytics' },
            { model: TrsNoPrefs, name: 'TrsNoPrefs' },
            { model: TrsTargeting, name: 'TrsTargeting' },
            { model: TrsThirdParty, name: 'TrsThirdParty' }
        ];

        const summaries = await Promise.all(collections.map(async (collection) => {
            const totalCount = await collection.model.countDocuments(); // Total count
            const uniqueVendors = await collection.model.distinct("VendorName").length; // Unique vendor count
            
            // You may want to scan all documents to find out how many pages would be scanned
            const documents = await collection.model.find().limit(1000); // Fetch a limited number of documents for demonstration
            const scannedPages = Math.ceil(documents.length / 10); // Assuming each page shows 10 documents

            return {
                collection: collection.name,
                totalCount,
                uniqueVendors,
                scannedPages
            };
        }));

        res.json(summaries); // Send the summary as the response
    } catch (error) {
        console.error('Error fetching summary of collections:', error);
        res.status(500).json({ error: 'Failed to retrieve summary' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
