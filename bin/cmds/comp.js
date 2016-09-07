'use strict';

/* eslint no-unused-vars:0, no-unused-expressions:0 */
var yargs = require('yargs');
exports.command = 'comp';
exports.desc = 'Print shell completion script';
exports.builder = {};
exports.handler = function (argv) {
  yargs.showCompletionScript().argv;
};