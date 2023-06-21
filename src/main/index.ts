import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { listBoards, uploadSketch } from '../arduino-cli-wrapper/arduinoCliWrapper'
import { listFilesInFolder } from '../main/jsonMenager'
import {
  modifyArduinoCodeWithImagesFromFile,
  ArduinoCodeModificationParamsFile,
  ArduinoCodeModificationParamsRawJson,
  modifyArduinoCodeWithImagesFromRawCode
} from '../arduino-cli-wrapper/modifySketch'
import path from 'path'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('listboard-request', (event) => {
  // Process the request and prepare the response
  return listBoards().then((list) => {
    event.sender.send('listboard-response', list)
  })
  // Send the response back to the renderer process
})

ipcMain.on('uploadCodeFromFile', (_event, nameOfFile) => {
  const sketchPath = path.resolve(process.cwd(), 'src/arduino-cli-wrapper/sketch/sketch.ino')

  const param: ArduinoCodeModificationParamsFile = {
    originalFilePath: sketchPath,
    jsonFilePath: path.resolve(process.cwd(), 'src/jsons/' + nameOfFile)
  }
  modifyArduinoCodeWithImagesFromFile(param)
    .then(() => uploadSketch(sketchPath, 'arduino:avr:micro', '/dev/ttyACM0'))
    .catch((err) => console.log(err))
})

ipcMain.on('uploadCodeFromJson', (_event, jsonString) => {
  const sketchPath = path.resolve(process.cwd(), 'src/arduino-cli-wrapper/sketch/sketch.ino')

  const param: ArduinoCodeModificationParamsRawJson = {
    originalFilePath: sketchPath,
    json: jsonString
  }
  modifyArduinoCodeWithImagesFromRawCode(param)
    .then(() => uploadSketch(sketchPath, 'arduino:avr:micro', '/dev/ttyACM0'))
    .catch((err) => console.log(err))
})

ipcMain.handle('getListOfJsons', async (_event) => {
  return listFilesInFolder()
    .then((fileList) => {
      return fileList
    })
    .catch((error) => {
      throw new Error(`Failed to list files: ${error.message}`)
    })
})
