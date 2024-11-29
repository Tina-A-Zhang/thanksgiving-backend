const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Your Google Apps Script URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwc3vUZ2Evxco_GoxuaMV-bnRhh7XnmGt6zg8bkkVLy7JFSen2f4ltQ2QMNxkk7Uden/exec";

app.post("/submit-order", async (req, res) => {
  console.log("received request");
  try {
    // Forward request to Google Apps Script
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    // Send back the response to the client
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error in Proxy:", error.message);
    res.status(500).send({ success: false, message: "Proxy server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
