const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Your existing endpoint
app.post("/submit-order", async (req, res) => {
  try {
    console.log("Received request at proxy...");
    console.log("Request body:", req.body);

    // Forward request to Google Apps Script
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbyeRyGJDHxt0HK5-kYEhkQaQjsRUn5BkoV6694-VL84u5Gv8ebqcC5_i5a5-eSeciJD/exec",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Google Apps Script response:", response.data);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error in Proxy:", error.message);
    res.status(500).send({ success: false, message: "Proxy server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
