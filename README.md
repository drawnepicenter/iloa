# iloa

[![Build Status](https://travis-ci.org/drawnepicenter/iloa.svg?branch=master)](https://travis-ci.org/drawnepicenter/iloa) [![Dependency Status](https://gemnasium.com/badges/github.com/drawnepicenter/iloa.svg)](https://gemnasium.com/github.com/drawnepicenter/iloa) [![npm version](https://badge.fury.io/js/iloa.svg)](https://badge.fury.io/js/iloa) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Introduction

*iloa* is [Samoan](https://en.wikipedia.org/wiki/Samoan_language) for **knowing**

iloa is a powerful tool for gaining knowledge from the command line. It queries [DuckDuckGo](https://duckduckgo.com/api), [Encyclopedia of Life](http://eol.org/), [Weather Underground](https://www.wunderground.com/), [Wikipedia](https://www.wikipedia.org), [Wolfram|Alpha](https://www.wolframalpha.com/about.html), and more through meta-searches. See the [wiki](https://github.com/drawnepicenter/iloa/wiki) for more info.

## Platform

Looking for testers on OSX. Developed and tested on Linux. Works on Windows, see [Windows](#windows-installation) below.
Supported Node.js versions:

- 7.x
- 6.x
- 5.x
- 4.x - Works but it's really slow

## Install

### Linux installation

To initialize the config file and load themes, your NODE_PATH environment variable must point to the **lib/node_modules** directory of the Node.js installation. You can set this path automatically like this:

    export NP=$(which node)
    export BP=${NP%bin/node} #this replaces the string '/bin/node'
    export LP="${BP}lib/node_modules"
    export NODE_PATH="$LP"

Provided these lines are towards the end of the shell initialization file (at least after any NVM stuff) this should work for a system installation of Node.js and [nvm](https://github.com/creationix/nvm).

- Put your [EOL API key](http://eol.org/users/register) from your EOL profile into an environment variable **EOLKEY**
- Put your [Weather Underground API key](https://www.wunderground.com/member/registration) into an environment variable **WUNDERGROUND**
- Put your [Wolfram|Alpha API key](http://developer.wolframalpha.com/portal/apisignup.html) into an environment variable **WOLFRAM**

Add all of this to .bashrc, .zshrc, etc. then:

    npm install -g iloa
    iloa config init

### Windows installation

I highly recommend using [nodist](https://github.com/marcelklehr/nodist) to install Node.js on Windows. It automatically sets %NODE_PATH% for you, though you may have to edit it to make sure it doesn't contain itself (i.e. C:\...\...\node_modules;%NODE_PATH%). If you install Node.js manually, `npm install --global leximaven` will install the package in C:\Users\username\AppData\Roaming\npm\node_modules. And if you just do `npm install leximaven` then it will install the package to a subfolder of the Node.js installation, but that won't be the NODE_PATH folder unless you manually set it. Either way, you're going to have to mess around with Windows environment variables to get it to work. And don't forget to put your API keys into an environment variables.

As for getting the ANSI color escape codes to work, [Cmder](http://cmder.net/) seems to be the easiest way. It doesn't install a full linux environment like Cygwin, but you can still use some linux commands like **which**, **cat**, and **ls**.

## Usage

iloa has a built-in help system for CLI parameters and options. Access it with `iloa -h|--help [command] [subcommand]`. There is also the [wiki](https://github.com/drawnepicenter/iloa/wiki).

Here are some examples:

    // Get DuckDuckGo instant answers for Infected Mushroom
    iloa duck 'Infected Mushroom'

    // Get Encyclopedia of Life pages for Homo sapiens
    iloa life page 327955 -n -d -m -y -r -x

    // Get Weather Underground conditions and forecast for Tampa Knight Airport
    iloa weather -e conditions,forecast KTPF

    // Get Wolfram|Alpha computation of doppler shift
    iloa wolfram 'doppler shift'

    // Get Wikipedia article for George Gurdjieff
    iloa wikipedia 'George Gurdjieff'

See the [tests](https://github.com/drawnepicenter/iloa/blob/master/test/test.es6) for more.

## Resources

The following links can help you use iloa or perform related tasks.

- [Wikimindmap](https://github.com/nyfelix/wikimindmap) displays a mindmap of [Wikipedia](https://www.wikipedia.org) articles.
- [WikSearch](http://www.wiksearch.com) = [Datamuse](http://www.datamuse.com/api/) + [Wikipedia](https://www.wikipedia.org)
- [VTEC Info](http://www.nws.noaa.gov/os/vtec/pdfs/VTEC_explanation6.pdf), [US Severe Weather Map](http://www.wunderground.com/severe.asp) & [Euro Severe Weather Map](http://www.wunderground.com/severe/europe.html) for Wunderground alerts

## Contributing

See [CONTRIBUTING](https://github.com/drawnepicenter/iloa/blob/master/CONTRIBUTING.md).

## License

MIT :copyright: 2017 Andrew Prentice

## Powered by

DuckDuckGo, Encyclopedia of Life, Weather Underground, Wikipedia, and Wolfram|Alpha

## Extras

### Take Command

See [take-command](https://github.com/drawnepicenter/take-command).
