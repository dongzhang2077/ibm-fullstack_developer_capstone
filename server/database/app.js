const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Use /data path for Docker volume mount
const reviews_file = fs.existsSync("/data/reviews.json")
  ? "/data/reviews.json"
  : "data/reviews.json";
const dealerships_file = fs.existsSync("/data/dealerships.json")
  ? "/data/dealerships.json"
  : "data/dealerships.json";

// Helper function to read reviews from file
const getReviewsData = () => {
  return JSON.parse(fs.readFileSync(reviews_file, "utf8"));
};

// Helper function to read dealerships from file
const getDealershipsData = () => {
  return JSON.parse(fs.readFileSync(dealerships_file, "utf8"));
};

app.get("/fetchReviews", (req, res) => {
  const reviews_data = getReviewsData();
  res.json(reviews_data.reviews || reviews_data);
});

// Get reviews by dealer ID
app.get("/fetchReviews/dealer/:id", (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const reviews_data = getReviewsData();
    const allReviews = reviews_data.reviews || reviews_data;
    const dealerReviews = allReviews.filter(
      (review) => review.dealership === dealerId
    );
    res.json(dealerReviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews for dealer" });
  }
});
app.get("/fetchDealers", (req, res) => {
  const dealerships_data = getDealershipsData();
  res.json(dealerships_data.dealerships || dealerships_data);
});
// Get dealerships by state
app.get("/fetchDealers/:state", (req, res) => {
  try {
    const state = req.params.state;
    const dealerships_data = getDealershipsData();
    const allDealerships = dealerships_data.dealerships || dealerships_data;
    const documents = allDealerships.filter((dealer) => dealer.state === state);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dealerships by state" });
  }
});
// Get dealer by ID
app.get("/fetchDealer/:id", (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const dealerships_data = getDealershipsData();
    const allDealerships = dealerships_data.dealerships || dealerships_data;
    const dealer = allDealerships.find((dealer) => dealer.id === dealerId);
    res.json(dealer || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dealer" });
  }
});

// Insert a new review
app.post("/insert_review", (req, res) => {
  try {
    const newReview = req.body;
    const reviews_data = getReviewsData();
    const allReviews = reviews_data.reviews || reviews_data;
    // Add an ID if not present
    if (!newReview.id) {
      newReview.id =
        allReviews.length > 0
          ? Math.max(...allReviews.map((r) => r.id)) + 1
          : 1;
    }
    allReviews.push(newReview);
    // Save back to the data structure
    if (reviews_data.reviews) {
      reviews_data.reviews = allReviews;
    }
    // Save to file (use the same file path)
    fs.writeFileSync(reviews_file, JSON.stringify(reviews_data, null, 2));
    res.json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert review" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
