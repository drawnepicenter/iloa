/* eslint-disablemax-len:0 */
const themes = require('../../themes')
const tools = require('../../tools')

const _ = require('lodash')
const http = require('good-guy-http')()
const noon = require('noon')

const CFILE = `${process.env.HOME}/.iloa.noon`

exports.command = 'hierarchy <id>'
exports.aliases = ['hier', 'hi']
exports.desc = 'Returns data for a single hierarchy and its root taxa'
exports.builder = {
  out: {
    alias: 'o',
    desc: 'Write cson, json, noon, plist, yaml, xml',
    default: '',
    type: 'string'
  },
  force: {
    alias: 'f',
    desc: 'Force overwriting outfile',
    default: false,
    type: 'boolean'
  },
  save: {
    alias: 's',
    desc: 'Save options to config file',
    default: false,
    type: 'boolean'
  },
  cachettl: {
    alias: 'c',
    desc: 'No. of seconds you wish to have the response cached',
    default: 60,
    type: 'number'
  },
  language: {
    alias: 'g',
    desc: tools.wrapStr('ms, de, en, es, fr, gl, it, nl, nb, oc, pt-BR, sv, tl, mk, sr, uk, ar, zh-Hans, zh-Hant, ko', true, true),
    default: 'en',
    type: 'string'
  }
}
exports.handler = (argv) => {
  tools.checkConfig(CFILE)
  let config = noon.load(CFILE)
  const userConfig = {
    common: argv.m,
    synonym: argv.y,
    cachettl: argv.c,
    language: argv.g
  }
  if (config.merge) config = _.merge({}, config, userConfig)
  if (argv.s && config.merge) noon.save(CFILE, config)
  if (argv.s && !config.merge) throw new Error("Can't save user config, set option merge to true.")
  const theme = themes.loadTheme(config.theme)
  if (config.verbose) themes.label(theme, 'down', 'Encyclopedia of Life')
  const prefix = `http://eol.org/api/hierarchies/1.0/${argv.id}.json`
  const ucont = []
  ucont.push(`cachettl=${argv.c}`)
  ucont.push(`language=${argv.g}`)
  ucont.push(`key=${process.env.EOLKEY}`)
  const url = `${prefix}?${ucont.join('&')}`
  const tofile = {
    type: 'hierarchies',
    source: 'http://eol.org'
  }
  http({ url }, (error, response) => {
    if (!error && response.statusCode === 200) {
      const body = JSON.parse(response.body)
      themes.label(theme, 'right', 'Title', body.title)
      tofile.title = body.title
      themes.label(theme, 'right', 'Contributor', body.contributor)
      tofile.contributor = body.contributor
      themes.label(theme, 'right', 'Date Submitted', body.dateSubmitted)
      tofile.dateSubmitted = body.dateSubmitted
      if (body.source !== '') {
        themes.label(theme, 'right', 'Source', body.source)
        tofile.source = body.source
      }
      if (body.roots) {
        tofile.roots = {}
        themes.label(theme, 'right', 'Root Taxa')
        for (let i = 0; i <= body.roots.length - 1; i++) {
          const item = body.roots[i]
          themes.label(theme, 'right', 'Parent Name Usage ID', item.parentNameUsageID)
          tofile.roots[[`parentNameUsageID${i}`]] = item.parentNameUsageID
          themes.label(theme, 'right', 'Scientific Name', item.scientificName)
          tofile.roots[[`scientificName${i}`]] = item.scientificName
          themes.label(theme, 'right', 'Taxon ID', item.taxonID)
          tofile.roots[[`taxonID${i}`]] = item.taxonID
          themes.label(theme, 'right', 'Source ID', item.sourceIdentifier)
          tofile.roots[[`sourceIdentifier${i}`]] = item.sourceIdentifier
          themes.label(theme, 'right', 'Taxon Rank', item.taxonRank)
          tofile.roots[[`taxonRank${i}`]] = item.taxonRank
        }
      }
      if (argv.o) tools.outFile(argv.o, argv.f, tofile)
    } else {
      throw new Error(error)
    }
  })
}
