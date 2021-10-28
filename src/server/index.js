// require all dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mockAPI = require("./mockAPI");
const path = require("path");
require("dotenv").config();

// initialize app and use packages
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

// Main variables for enviroment
const PORT = 8081;
const API_URL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.API_KEY;

//Home page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// test
app.get("/test", (req, res) => {
  res.send(mockAPI);
});

// post data to app
app.post("/call-api", (req, res) => {
  const { enteredUrl } = req.body;
  const FULL_URL = `${API_URL}?key=${API_KEY}&url=${enteredUrl}&lang=en`;
  axios(FULL_URL)
    .then((data) => {
      const {
        sentence_list,
        score_tag,
        agreement,
        subjectivity,
        confidence,
        irony,
      } = data;

      res.send({
        text: sentence_list[0].text || "",
        score_tag: score_tag,
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// listen to app on port 8081
app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Server listening on port ${PORT}`);
});
