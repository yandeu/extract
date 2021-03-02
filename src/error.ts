import { PACKAGE_NAME } from './const'

export const error = (msg?: string) => {
  if (msg) console.error(msg)
  else console.error(`Usage: ${PACKAGE_NAME} [<key>] <filename>`)
  process.exit(1)
}
