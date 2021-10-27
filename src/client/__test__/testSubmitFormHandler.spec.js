import "babel-polyfill";
import submitFormHandler from "../js/submitFormHandler";

describe("Submit Test", () => {
  test("submitFormHandler Test", () => {
    expect(submitFormHandler).toBeDefined();
  });
});
