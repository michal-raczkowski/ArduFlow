import { execFile } from 'child_process'
import fs from 'fs'
import * as path from 'path'

const arduinoCliBinPath = path.resolve(process.cwd(), 'bin-arduino-cli/bin/arduino-cli')
const arduinoCliConfigPath = path.resolve(process.cwd(), 'bin-arduino-cli/bin/arduino-cli.yaml')
const arduinoCoreData = path.resolve(process.cwd(), 'bin-arduino-cli/bin/data')

export function listBoards(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    execFile(
      arduinoCliBinPath,
      ['--config-file', arduinoCliConfigPath, 'board', 'list'],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Arduino-CLI command: ${error}`)
          reject(error)
          return
        }
        // Check the output for any error messages
        if (stderr) {
          console.error(`Arduino-CLI error: ${stderr}`)
          reject(stderr)
          return
        }

        resolve(stdout.trim())
      }
    )
  })
}

export function uploadSketch(sketchPath: string, board: string, port: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    execFile(
      arduinoCliBinPath,
      [
        '--config-file',
        arduinoCliConfigPath,
        'compile',
        '--upload',
        '--fqbn',
        board,
        '--port',
        port,
        sketchPath
      ],
      (error, _stdout, stderr) => {
        if (error) {
          console.error(`Error executing Arduino-CLI command: ${error}`)
          reject(error)
          return
        }

        // Check the output for any error messages
        if (stderr) {
          console.error(`Arduino-CLI error: ${stderr}`)
          reject(stderr)
          return
        }

        console.log(`Sketch uploaded successfully.`)
        resolve()
      }
    )
  })
}

export function isArduinoAvrCoreInstalled(): Promise<Boolean> {
  return new Promise<Boolean>((resolve, reject) => {
    execFile(
      arduinoCliBinPath,
      ['--config-file', arduinoCliConfigPath, 'core', 'list'],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Arduino-CLI command: ${error}`)
          reject(error)
          return
        }
        // Check the output for any error messages
        if (stderr) {
          console.error(`Arduino-CLI error: ${stderr}`)
          reject(stderr)
          return
        }

        console.log(stdout.trim())
        if (stdout.trim() == ' ') {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })
}

export function isCoreExist(): boolean {
  try {
    const stats = fs.statSync(arduinoCoreData)
    if (stats.isDirectory()) {
      console.log('Folder exists.')
      return true
    } else {
      console.log('Path exists, but it is not a folder.')
      return false
    }
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log('Folder does not exist.')
      return false
    } else {
      console.error(`Error checking folder existence: ${e}`)
      return false
    }
  }
}

export function installArduinoCore(): Promise<void> {
  return new Promise<void>((_resolve, reject) => {
    execFile(
      arduinoCliBinPath,
      ['--config-file', arduinoCliConfigPath, 'core', 'install', 'arduino:avr'],
      (error, _stdout, stderr) => {
        if (error) {
          console.error(`Error executing Arduino-CLI command: ${error}`)
          reject(error)
          return
        }
        // Check the output for any error messages
        if (stderr) {
          console.error(`Arduino-CLI error: ${stderr}`)
          reject(stderr)
          return
        }
      }
    )
  })
}

export function getAvailablePorts(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    execFile(
      arduinoCliBinPath,
      ['--config-file', arduinoCliConfigPath, 'board', 'list'],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Arduino-CLI command: ${error}`)
          reject(error)
          return
        }
        // Check the output for any error messages
        if (stderr) {
          console.error(`Arduino-CLI error: ${stderr}`)
          reject(stderr)
          return
        }
        const lines = stdout.split('\n').filter((n) => n)
        const ports = lines.slice(1).map((line) => line.split(' ')[0])
        const names = lines.slice(1).map((line) => line.split(' ')[7] + ' ' + line.split(' ')[8])

        if (names.length !== ports.length) {
          console.error(`Length of ports and names of connected arduino's do not match`)
          reject('Index outside of range')
          return
        }

        const result: string[] = new Array(ports.length)
        const length = ports.length
        for (let i = 0; i < length; i++) {
          result[i] = ports[i] + ' ' + names[i]
        }
        resolve(result)
      }
    )
  })
}
