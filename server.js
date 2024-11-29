const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Your Google Apps Script URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx-KBCp4-j3uHDt7wV9ads4NTOUSWJn7HTJF_53YiwYRJ9BfYkpAT2fhy7HVW6sA5dE/exec";

app.post("/submit-order", async (req, res) => {
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
