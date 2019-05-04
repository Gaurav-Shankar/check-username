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
  await expect(appendUserNameAndSendResult("test",sites)).resolves.toMatchObject({
    "percentage": "0.00", 
    "sites": [{"class": "unkown", "name": "site1", "url": "https://example.com"}]
  });
  expect(console.log).toHaveBeenNthCalledWith(
    2,
    clc.redBright(`Could not check the username status ${clc.cyanBright("site1")}\n`)
  );
});