[![NPM](https://nodei.co/npm/unique-username.png)](https://nodei.co/npm/unique-username/)

![](https://img.shields.io/npm/dm/unique-username.svg)

[![Open Source Helpers](https://www.codetriage.com/gaurav-shankar/check-username/badges/users.svg)](https://www.codetriage.com/gaurav-shankar/check-username)

<p>
    <a href="https://www.producthunt.com/posts/usernamecli?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-usernamecli" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=155902&theme=dark" alt="usernameCLI - How unique is your username? | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" />
    </a>
 </p>

#  Check Username availability across 140+ websites instantly

Very often while registering to new websites we try to keep the same username across all the websites. Sometimes the username is available and sometimes it’s not. :(

I created a simple tool using which you can instantly find out if your favorite username is available or not on over 140+ websites.

## Installation

Use [npm](https://www.npmjs.com/package/unique-username) to install username.

```bash
npm i unique-username -g      //-g to install the project globally
```

## Usage
Check the availability of a particular username across all 140+ websites.
```bash
username u <your_username>
```

Check the availability of a particular username on a particular website.
```bash
username d <serviceName> <your_username>
```

Get the list of all supported services
```bash
username services
```

Help
```bash
username u --help
```

## Contributing
Please raise an issue if you feel something is wrong or a potential bug.
Please raise PR with any changes or additional features that you may like to add.

You must have the below dependencies before you start working on it.

    Node.js
    npm

Once you've met the dependencies, cd to the project folder and execute this command to run the project with node.

```bash
node index.js u <your_username>
```
## License
[MIT](https://choosealicense.com/licenses/mit/)
