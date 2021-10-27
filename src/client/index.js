import submitFormHandler from "./js/submitFormHandler";
const form = document.getElementById("form");
import "./styles/style.scss";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitFormHandler();
});

export { submitFormHandler };
