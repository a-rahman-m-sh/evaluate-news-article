import validateURL from "./validateURL";

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

function submitFormHandler() {
  console.log("this is entered");
  const enteredUrl = document.getElementById("article-url").value;
  if (validateURL(enteredUrl)) {
    postData("http://localhost:8081/call-api", {
      enteredUrl,
    }).then((res) => {
      document.getElementById("text").textContent = res.text;
      document.getElementById("agreement").textContent = res.agreement;
      document.getElementById("confidence").textContent = res.confidence;
      document.getElementById("score_tag").textContent = res.score_tag;
      document.getElementById("subjectivity").textContent = res.subjectivity;
      document.getElementById("irony").textContent = res.irony;
    });
  } else {
    alert(`This Is Not a Valid URL:
    Kindly Insert Valid URL`);
  }
}

export default submitFormHandler;
