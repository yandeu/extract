#!/usr/bin/env node

import { extract } from './extract'

extract(process.argv.slice(2), false)
