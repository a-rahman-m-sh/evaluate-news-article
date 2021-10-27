import validateURL from "../js/validateURL";

describe("Validate URL Test", () => {
  test("validateURL Test", () => {
    expect(validateURL).toBeDefined();
  });

  test("validateURL return false if not URL", () => {
    expect(validateURL("PogyMan")).toBeFalsy();
  });

  test("validateURL return false if URL", () => {
    expect(validateURL("http://test.com")).toBeTruthy();
  });
});
