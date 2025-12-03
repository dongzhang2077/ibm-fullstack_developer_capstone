const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const reviews_data = JSON.parse(fs.readFileSync("data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("data/dealerships.json", 'utf8'));

app.get('/fetchReviews', (req, res) => {
    res.json(reviews_data.reviews || reviews_data);
});

app.get('/fetchDealers', (req, res) => {
    res.json(dealerships_data.dealerships || dealerships_data);
});
// Get dealerships by state
app.get('/fetchDealers/:state', (req, res) => {
    try {
        const state = req.params.state;
        const allDealerships = dealerships_data.dealerships || dealerships_data;
        const documents = allDealerships.filter(dealer => dealer.state === state);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dealerships by state' });
    }
});

// Get dealer by ID
app.get('/fetchDealer/:id', (req, res) => {
    try {
        const dealerId = parseInt(req.params.id);
        const allDealerships = dealerships_data.dealerships || dealerships_data;
        const dealer = allDealerships.find(dealer => dealer.id === dealerId);
        res.json(dealer || {});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dealer' });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
