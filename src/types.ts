export interface PackageJSON {
  name: string
  version: string
  description: string
  [key: string]: string | object
}
