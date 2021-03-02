const fs = require('fs')
const path = require('path').resolve('./') + '/'
const { main } = require('../lib/main.js')

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

describe('extract#output esm', () => {
  test('simple', () => {
    const res = main(['', '', 'version', 'version.ts'])
    expect(res.path).toBe(path + 'version.ts')
    expect(res.output.trim()).toBe('export const VERSION = "1.0.0"')
  })

  test('sub directory', () => {
    let res = main(['', '', 'version', 'src/version.ts'])
    expect(res.path).toBe(path + 'src/version.ts')

    res = main(['', '', 'version', '/src/version.ts'])
    expect(res.path).toBe(path + 'src/version.ts')

    res = main(['', '', 'version', './src/version.ts'])
    expect(res.path).toBe(path + 'src/version.ts')
  })

  test('multiple keys', () => {
    const res = main(['', '', 'name', 'version', 'output.ts'])
    expect(res.output.trim()).toBe('export const NAME = "my_package"\nexport const VERSION = "1.0.0"')
  })

  test('nested keys', () => {
    const res = main(['', '', 'repository.type', 'output.ts'])
    expect(res.output.trim()).toBe('export const TYPE = "git"')
  })

  test('objects', () => {
    const res = main(['', '', 'repository', 'output.ts'])
    expect(res.output.trim()).toBe(
      'export const REPOSITORY = {\n  "type": "git",\n  "url": "https://github.com/monatheoctocat/my_package.git"\n}'
    )
  })

  test('arrays', () => {
    const res = main(['', '', 'keywords', 'output.ts'])
    expect(res.output.trim()).toBe(
      'export const KEYWORDS = [\n  "github",\n  "mascot",\n  "mona",\n  "lisa",\n  "octocat"\n]'
    )
  })
})

describe('extract#output cjs', () => {
  test('simple', () => {
    const res = main(['', '', 'version', 'version.js'])
    expect(res.path).toBe(path + 'version.js')
    expect(res.output.trim()).toBe('exports.VERSION = "1.0.0"')
  })

  test('sub directory', () => {
    let res = main(['', '', 'version', 'src/version.js'])
    expect(res.path).toBe(path + 'src/version.js')

    res = main(['', '', 'version', '/src/version.js'])
    expect(res.path).toBe(path + 'src/version.js')

    res = main(['', '', 'version', './src/version.js'])
    expect(res.path).toBe(path + 'src/version.js')
  })

  test('multiple keys', () => {
    const res = main(['', '', 'name', 'version', 'output.js'])
    expect(res.output.trim()).toBe('exports.NAME = "my_package"\nexports.VERSION = "1.0.0"')
  })

  test('nested keys', () => {
    const res = main(['', '', 'repository.type', 'output.js'])
    expect(res.output.trim()).toBe('exports.TYPE = "git"')
  })

  test('objects', () => {
    const res = main(['', '', 'repository', 'output.js'])
    expect(res.output.trim()).toBe(
      'exports.REPOSITORY = {\n  "type": "git",\n  "url": "https://github.com/monatheoctocat/my_package.git"\n}'
    )
  })

  test('arrays', () => {
    const res = main(['', '', 'keywords', 'output.js'])
    expect(res.output.trim()).toBe(
      'exports.KEYWORDS = [\n  "github",\n  "mascot",\n  "mona",\n  "lisa",\n  "octocat"\n]'
    )
  })
})

describe('extract#error', () => {
  test('invalid number of args', () => {
    const res = main(['', '', 'version'])
    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
