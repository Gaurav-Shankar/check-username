const clc = require("cli-color");
const fetch = require("node-fetch");
const util = require("util");

async function appendUserNameAndSendResult(username,sites) {
  let counter = 0;

  for (let site of sites) {
    console.log(`Checking : ${clc.yellowBright(site.name)}`);

    let res;
    try {
      res = await fetch(util.format(site.url, encodeURIComponent(username)));
    } catch (err) {
      res = {};
    }

    if (res.status === 200) {
      counter++;
      console.log(clc.redBright(`Username already taken on ${clc.cyanBright(site.name)}\n`));
    } else if (res.status === 404) {
      console.log(clc.greenBright(`Username is available to take on ${clc.cyanBright(site.name)}\n`));
    } else {
      console.log(clc.redBright(`Could not check the username status ${clc.cyanBright(site.name)}\n`));
    }
  }

  return calculatePercentage(counter, username);

  function calculatePercentage(counter, username) {
    var percentage = ((counter / sites.length) * 100).toFixed(2);

    console.log(clc.greenBright(`Username ${username} exists on ${percentage}% of websites that we checked`));
  }
}

module.exports = {
  appendUserNameAndSendResult
};
