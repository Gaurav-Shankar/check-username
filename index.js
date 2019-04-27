#!/usr/bin/env node

const program = require('commander');
var checkusername = require('./checkusername');
var clc = require("cli-color");
 
program
  .command('u <name>')
  .description('Check username availability across 60+ major websites!')
  .action(async function(name, options){
    console.log('Checking username: %s', name);
    await checkusername.appendUserNameAndSendResult(name)
 });

program.on('command:*', function() {
    console.log("\n");
    console.error(clc.redBright('Invalid command: %s\nSee --help for the list of available commands.'), program.args.join(' '));
    console.log("\n");
    process.exit(1);
});
 
program.parse(process.argv);