var clc = require("cli-color");
const fetch = require('node-fetch');

var urls =  [ 
   'https://www.instagram.com/',
   'https://disqus.com/by/',
   'https://www.pinterest.com/',
   'https://codepen.io/',
   'https://jsfiddle.net/user/',
   'https://mobile.twitter.com/',
   'https://www.patreon.com/',
   'https://www.youtube.com/user/',
   'https://imgur.com/',
   'https://www.reddit.com/user/',
   'https://m.twitch.tv/profile',
   'https://ask.fm/',
   'https://medium.com/@',
   'https://github.com/',
   'https://www.flickr.com/photos/',
   'https://issuu.com/',
   'https://fancy.com/',
   'https://themeforest.net/user/',
   'https://myspace.com/',
   'https://dribbble.com/',
   'https://www.kickstarter.com/profile/',
   'https://about.me/',
   'https://deviantart.com/',
   'https://en.gravatar.com/',
   'https://www.reverbnation.com/',
   'https://bandcamp.com/',
   'https://foursquare.com/',
   'https://www.behance.net/',
   'https://vid.me/',
   'https://ello.co/',
   'https://www.buzzfeed.com/',
   'https://followus.com/',
   'https://teamtreehouse.com/',
   'https://venmo.com/',
   'https://coderwall.com/',
   'https://angel.co/',
   'https://soundcloud.com/',
   'https://weheartit.com/',
   'https://newgrounds.com/',
   'http://www.crunchyroll.com/user/',
   'http://weebly.com/',
   'http://profile.hatena.com/',
   'http://tumblr.com/',
   'http://www.posteet.com/posteets/',
   'http://www.fotolog.com/',
   'https://www.hackerrank.com/', 
   'https://www.hackerearth.com/@',
   'https://dev.to/'
   ]

var index = 0;
var counter = 1;
function appendUserNameAndSendResult(username,index) {
    websitename = returnDomainName(urls[index])
    if(websitename.includes('imgur') || websitename.includes('deviantart') || websitename.includes('newgrounds') || websitename.includes('weebly') ||websitename.includes('tumblr')){
      var url = "http://"+username+"."+websitename;
    }
    else{
      var url = urls[index]+username;
    }
    console.log('Checking : '+clc.yellowBright(websitename));
    fetch(url)
    .then(res => {
      if(res.status === 200) {
        counter = counter + 1;
        console.log(clc.redBright('Username already taken on '+clc.cyanBright(websitename)) + "\n")
      }
      else if(res.status === 404) {
        console.log(clc.greenBright('Username is available to take on '+clc.cyanBright(websitename)) + "\n")
      }
      else{
        console.log(clc.redBright("Could not check the username status "+clc.cyanBright(websitename)) + "\n") 
      }
      index = index+1;
      if(index === urls.length) {
        calculatePercentage(counter,username)
        return;
      }
      appendUserNameAndSendResult(username,index);  
    })
}


function calculatePercentage(counter, username) {
  var percentage = ((counter/urls.length) * 100).toFixed(2);
  console.log(clc.greenBright("Username "+username+" exists on "+counter+" out of "+urls.length+" websites that we checked and is "+percentage+"% unique."));
}

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
      return res;
    } else {
        console.log("Couldn't check the username")
    }
}

function returnDomainName(url){
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}


module.exports = {
  appendUserNameAndSendResult
}