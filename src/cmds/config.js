/* eslint no-unused-vars: 0 */
exports.command = 'config <command>'
exports.desc = 'Configuration tasks'
exports.builder = (yargs) => yargs.commandDir('config_cmds')
exports.handler = (argv) => {}
