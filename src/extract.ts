import fs from 'fs'
import path from 'path'

import { PACKAGE_NAME } from './const'
import { PackageJSON } from './types'
import { error } from './error'
import { output } from './output'

export const extract = (args: string[], filename: string, testing = true) => {
  if (args.length < 1) return error()
  if (!filename) return error()

  const KEYS = args

  const FILENAME = filename.replace(/^\.?\//, '') as string
  if (!FILENAME) return error()

  const _tmp = fs.readFileSync(path.resolve(!testing ? './package.json' : './test/package.test.json'), {
    encoding: 'utf-8'
  })
  const json: PackageJSON = JSON.parse(_tmp)

  const isESM = /\.tsx?|mjs$/.test(FILENAME)
  const isCJS = /\.jsx?|cjs$/.test(FILENAME)
  if (!isESM && !isCJS) error(`${PACKAGE_NAME}: File extension has to be .js .jsx .cjs .ts .tsx or .mjs`)

  return output(KEYS, FILENAME, json, isESM, testing)
}
