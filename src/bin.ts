#!/usr/bin/env node

import { error } from './error'
import { extract } from './extract'

const args = process.argv.slice(2)
const filename = args.pop()

if (!filename) error()
else extract(args, filename, false)
