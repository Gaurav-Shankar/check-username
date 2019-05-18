#!/usr/bin/env node

const program = require('commander');
var checkusername = require('./checkusername');
var clc = require("cli-color");
const express = require('express');
const sites = require("./sites");
 
program
  .command('u <name>')
  .description('Check username availability across 140+ major websites!')
  .action(async function(name, options){
    console.log('Checking username: %s', name);
    await checkusername.appendUserNameAndSendResult(name,sites)
    process.exit(1);
 });

 program
  .command('services')
  .description('Get the list of all supported services')
  .action(async function(){
    await checkusername.printResources(sites)
    process.exit(1);
  });

program
  .command('d <service> <name>')
  .description('Check the availability of your username on a partcular serivce')
  .action(async function(service,name, options){
    console.log('Checking username: %s', name);
    console.log('Checking app: %s', service);
    await checkusername.getParticularAppUserAvailability(service,name,sites)
    process.exit(1);
  })

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

app.get('/api/user/:_user', async function(req, res) {
	res.json(await checkusername.appendUserNameAndSendResult(req.params._user,sites));
});

app.get('/api/sites', (req, res) => {
	res.json(sites);
});

app.get('/api/sites/:_name', (req, res) => {
	res.json(sites.find(({name}) => name === req.params._name));
});

app.listen(port, () => console.log());