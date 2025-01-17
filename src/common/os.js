import fs from 'fs'
import os from 'os'
import { join } from 'path'

const { mkdtemp } = fs.promises
const { arch, platform } = process

export const home = os.homedir()

export const darwin = platform === 'darwin'
export const linux = platform === 'linux'
export const win32 = platform === 'win32'

export const system = `${os.type()} ${os.release()} (${arch})`

export const mkdtmp = (name = 'tropy') =>
  mkdtemp(join(os.tmpdir(), name))

export const normalize = win32 ?
  (path) => path :
  (path) => path.replace(/\\/g, '/')
