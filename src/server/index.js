const mockAPIResponse = require("./mockAPI.js");
const PORT = 8081;
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const API_URL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.API_KEY;
const app = express();
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/call-api", async (req, res) => {
  const enteredArticleURL = req.body.enteredUrl;
  const FULL_URL = `${API_URL}?key=${API_KEY}&url=${enteredArticleURL}&lang=en`;
  console.log(enteredArticleURL, FULL_URL);
  try {
    const {
      data: {
        sentence_list,
        score_tag,
        agreement,
        subjectivity,
        confidence,
        irony,
      },
    } = await axios(FULL_URL);
    res.send({
      text: sentence_list[0].text || "",
      score_tag: score_tag,
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Server listening on port ${PORT}!`);
});
