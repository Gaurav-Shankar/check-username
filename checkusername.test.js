const clc = require("cli-color");
const fetch = require("node-fetch");
const sites = require("./sites");
const { appendUserNameAndSendResult } = require("./checkusername");

jest.mock("./sites", () => [
  {
    url: "https://example.com",
    name: "site1"
  }
]);
jest.mock("node-fetch", () => jest.fn());
jest.spyOn(global.console, "log");

test("fetch throws exception", async () => {
  fetch.mockImplementation(() => Promise.reject("fake fetch error"));
  await expect(appendUserNameAndSendResult("test")).resolves.toEqual(undefined);
  expect(console.log).toHaveBeenNthCalledWith(
    2,
    clc.redBright(`Could not check the username status ${clc.cyanBright("site1")}\n`)
  );
});
