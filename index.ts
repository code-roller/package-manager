import { argv } from 'process'

import { PackageArgumentParser } from './argument/parser'


const argumentParser = new PackageArgumentParser(argv)
argumentParser.parseCommandArguments()