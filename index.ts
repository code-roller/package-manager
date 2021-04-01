import { argv } from 'process'

import { PackageArgumentParser } from './argument/parser'

export const APPLICATION_VERSION:string = "0.0.1"

const argumentParser = new PackageArgumentParser(argv)
argumentParser.parseCommandArguments()