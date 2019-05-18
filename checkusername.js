#!/usr/bin/env node

const clc = require("cli-color");
const fetch = require("node-fetch");
const util = require("util");
var fs  = require('fs');

async function fetchResourcesForNextRun() {
  try {
  await fetch("https://check-user-api.herokuapp.com/api/v1/getServiceNames")
  .then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then(json => {
    fs.writeFile("./sites.json", JSON.stringify(json), 'utf8', function (err) {
      if (err) {
          return err;
      }
        });
      })
    }
  catch(error) {
  }
}

async function appendUserNameAndSendResult(username,sites) {
  fetchResourcesForNextRun();
  sites = sites.map(({name,url}) => {return {name,url,class:null}});
  let counter = 0;

  for (let site of sites) {
    let res;
    let url = "https://check-user-api.herokuapp.com/api/v1/"+site.name+"/"+username;
    try {
      res = await fetch(url)
      .then(res => res.json())
      .then(json =>  { 
      console.log("Checking : "+json.appName)
      if (json.userNameAvailable === true) {
        counter++;
        console.log(clc.greenBright(`Username is available to take on ${clc.cyanBright(site.name)}\n`));
      }
      else if(json.userNameAvailable === false) {
        console.log(clc.redBright(`Username already taken on ${clc.cyanBright(site.name)}\n`));
      }
    }) 
    } catch (err) {
      res = {};
    }
  }

  return { 
    percentage:stats(counter, username), sites 
  };

  function stats(counter, username) {
    console.log(clc.greenBright(`Username ${username} exists on ${counter} out of ${sites.length} websites that we checked`));
    return percentage;
  }
}

function printResources(sites) {
  sites = sites.map(({name,url}) => {return {name,url,class:null}});
  console.log("List of apps supported.")
  for (let site of sites) {
    console.log(clc.yellowBright(site.name + "\n"));
  }
  console.log("Total "+sites.length+" apps supported currently");
}

async function getParticularAppUserAvailability(appName,username,sites) {
      let url = "https://check-user-api.herokuapp.com/api/v1/"+appName+"/"+username;
      try {
        res =  await fetch(url)
        .then(res => res.json())
        .then(json =>  {
        
          if (json.userNameAvailable === true) {
            console.log(clc.greenBright("Username is available to take on " +clc.cyanBright(appName)));
          }
          else if(json.userNameAvailable === false) {
            console.log(clc.redBright("Username already taken on " +clc.cyanBright(appName)));
          }
          else{
            console.log(clc.redBright(json.errorMessage))
          }
      })
      } catch (err) {
        res = {};
      }
}

module.exports = {
  printResources,
  getParticularAppUserAvailability,
  appendUserNameAndSendResult
};
