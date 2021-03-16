import fs from 'fs'
import path from 'path'

import { PACKAGE_NAME } from './const'
import { PackageJSON } from './types'
import { error } from './error'
import { output } from './output'

export const extract = (args: string[], testing = true) => {
  const KEYS = args
  if (KEYS.length < 2) error()

  const FILENAME = KEYS.pop()?.replace(/^\.?\//, '') as string
  if (!FILENAME) error()

  const _tmp = fs.readFileSync(path.resolve(!testing ? './package.json' : './test/package.test.json'), {
    encoding: 'utf-8'
  })
  const json: PackageJSON = JSON.parse(_tmp)

  const isESM = /\.tsx?|mjs$/.test(FILENAME)
  const isCJS = /\.jsx?|cjs$/.test(FILENAME)
  if (!isESM && !isCJS) error(`${PACKAGE_NAME}: File extension has to be .js .jsx .cjs .ts .tsx or .mjs`)

  return output(KEYS, FILENAME, json, isESM, testing)
}
