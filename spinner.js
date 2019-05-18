'use strict'

const CLI = require('clui');
const Spinner = CLI.Spinner;

const spinner = new Spinner('Fetching username availability ...  ', ['🖲','💻','👩🏻‍💻','👨🏻‍💻','🤓','💻','🖱','🎮']);

module.exports = spinner;