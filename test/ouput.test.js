const fs = require('fs')
const path = require('path').resolve('./')
const { extract } = require('../lib/extract.js')

const isWin = process.platform === 'win32'

const makePath = p => {
  const _path = isWin ? p.replace(/\//gm, '\\') : p
  return path + _path
}

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

describe('extract#output esm', () => {
  test('simple', () => {
    const res = extract(['', '', 'version', 'version.ts'])
    expect(res.path).toBe(makePath('/version.ts'))
    expect(res.output.trim()).toBe('export const VERSION = "1.0.0"')
  })

  test('sub directory', () => {
    let res = extract(['', '', 'version', 'src/version.ts'])
    expect(res.path).toBe(makePath('/src/version.ts'))

    res = extract(['', '', 'version', '/src/version.ts'])
    expect(res.path).toBe(makePath('/src/version.ts'))

    res = extract(['', '', 'version', './src/version.ts'])
    expect(res.path).toBe(makePath('/src/version.ts'))
  })

  test('multiple keys', () => {
    const res = extract(['', '', 'name', 'version', 'output.ts'])
    expect(res.output.trim()).toBe('export const NAME = "my_package"\nexport const VERSION = "1.0.0"')
  })

  test('nested keys', () => {
    const res = extract(['', '', 'repository.type', 'output.ts'])
    expect(res.output.trim()).toBe('export const TYPE = "git"')
  })

  test('objects', () => {
    const res = extract(['', '', 'repository', 'output.ts'])
    expect(res.output.trim()).toBe(
      'export const REPOSITORY = {\n  "type": "git",\n  "url": "https://github.com/monatheoctocat/my_package.git"\n}'
    )
  })

  test('arrays', () => {
    const res = extract(['', '', 'keywords', 'output.ts'])
    expect(res.output.trim()).toBe(
      'export const KEYWORDS = [\n  "github",\n  "mascot",\n  "mona",\n  "lisa",\n  "octocat"\n]'
    )
  })
})

describe('extract#output cjs', () => {
  test('simple', () => {
    const res = extract(['', '', 'version', 'version.js'])
    expect(res.path).toBe(makePath('/version.js'))
    expect(res.output.trim()).toBe('exports.VERSION = "1.0.0"')
  })

  test('sub directory', () => {
    let res = extract(['', '', 'version', 'src/version.js'])
    expect(res.path).toBe(makePath('/src/version.js'))

    res = extract(['', '', 'version', '/src/version.js'])
    expect(res.path).toBe(makePath('/src/version.js'))

    res = extract(['', '', 'version', './src/version.js'])
    expect(res.path).toBe(makePath('/src/version.js'))
  })

  test('multiple keys', () => {
    const res = extract(['', '', 'name', 'version', 'output.js'])
    expect(res.output.trim()).toBe('exports.NAME = "my_package"\nexports.VERSION = "1.0.0"')
  })

  test('nested keys', () => {
    const res = extract(['', '', 'repository.type', 'output.js'])
    expect(res.output.trim()).toBe('exports.TYPE = "git"')
  })

  test('objects', () => {
    const res = extract(['', '', 'repository', 'output.js'])
    expect(res.output.trim()).toBe(
      'exports.REPOSITORY = {\n  "type": "git",\n  "url": "https://github.com/monatheoctocat/my_package.git"\n}'
    )
  })

  test('arrays', () => {
    const res = extract(['', '', 'keywords', 'output.js'])
    expect(res.output.trim()).toBe(
      'exports.KEYWORDS = [\n  "github",\n  "mascot",\n  "mona",\n  "lisa",\n  "octocat"\n]'
    )
  })
})

describe('extract#error', () => {
  test('invalid number of args', () => {
    const res = extract(['', '', 'version'])
    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
