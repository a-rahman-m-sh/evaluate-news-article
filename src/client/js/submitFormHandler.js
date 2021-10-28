// import validate url to check if url
import validateURL from "./validateURL";

// define the post function

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// accessing dom elements
const text = document.getElementById("text");
const agreement = document.getElementById("agreement");
const confidance = document.getElementById("confidence");
const score = document.getElementById("score_tag");
const subjectivity = document.getElementById("subjectivity");
const irony = document.getElementById("irony");
const url = document.getElementById("article-url");

// defining submit form functionality
function submitFormHandler() {
  console.log("Submitting...");
  const enteredUrl = url.value;

  // checking URL Validity and making the request
  if (validateURL(enteredUrl)) {
    postData("http://localhost:8081/call-api", {
      enteredUrl,
    }).then((res) => {
      text.textContent = `Text: ${res.text}`;
      agreement.textContent = `Agreement: ${res.agreement}`;
      confidance.textContent = `Confidance: ${res.confidence}`;
      score.textContent = `Score tag: ${res.score_tag}`;
      subjectivity.textContent = `Subjectivity: ${res.subjectivity}`;
      irony.textContent = `Irony: ${res.irony}`;
    });
  } else {
    alert(`This Is Not a Valid URL:
    Kindly Insert Valid URL`);
  }
}

export default submitFormHandler;
