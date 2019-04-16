#!/usr/bin/env node

const program = require('commander');
var checkusername = require('./checkusername');
 
program
  .command('uname <name>')
  .description('Check username availability across 60+ major websites!')
  .action(function(name, options){
    console.log('Checking username: %s', name);
    checkusername.appendUserNameAndSendResult(name,0)
 });
 
program.parse(process.argv);