#!/usr/bin/env node

const program = require('commander');
var checkusername = require('./checkusername');
var clc = require("cli-color");
const express = require('express');
const bodyParser = require('body-parser');
const sites = require("./sites");
 
program
  .command('u <name>')
  .description('Check username availability across 60+ major websites!')
  .action(async function(name, options){
    console.log('Checking username: %s', name);
    await checkusername.appendUserNameAndSendResult(name,sites)
 });

program.on('command:*', function() {
    console.log("\n");
    console.error(clc.redBright('Invalid command: %s\nSee --help for the list of available commands.'), program.args.join(' '));
    console.log("\n");
    process.exit(1);
});
 
program.parse(process.argv);

const app = express();
const port = process.env.PORT || 4040;

process.env.NODE_ENV === 'production' && app.use(express.static('client/build'));

app.use(bodyParser.json());

app.get('/api/user/:_user', async function(req, res) {
	res.json(await checkusername.appendUserNameAndSendResult(req.params._user,sites));
});

app.get('/api/sites', (req, res) => {
	res.json([null,sites]);
});

app.listen(port, () => console.log(`express listening on port ${port}`));
