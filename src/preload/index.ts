import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

const arduinoAPI = {
  requestListBoards: () => {
    return new Promise<string>((resolve, _reject) => {
      ipcRenderer.once('listboard-response', (_event, responseData) => {
        resolve(responseData)
      })

      ipcRenderer.send('listboard-request')
    })
  },
  uploadCodeFromFile: (nameOfFile: string) => {
    ipcRenderer.send('uploadCodeFromFile', nameOfFile)
  },
  uploadCodeFromJson: (jsonString: string, port: string) => {
    ipcRenderer.send('uploadCodeFromJson', jsonString, port)
  },
  getAvailablePorts: () => {
    return new Promise<string[]>((resolve, _reject) => {
      ipcRenderer.once('ports-response', (_event, responseData) => {
        resolve(responseData)
      })

      ipcRenderer.send('ports-request')
    })
  }
}

const jsonsFilesAPI = {
  getFileJsonList: async () => {
    try {
      const fileList: Promise<string[]> = await ipcRenderer.invoke('getListOfJsons')
      return fileList
    } catch (error) {
      console.error('Error retrieving file list:', error)
      return []
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('arduinoCliAPI', arduinoAPI)
    contextBridge.exposeInMainWorld('jsonsFilesAPI', jsonsFilesAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI

  // @ts-ignore (define in dts)
  window.api = api

  // @ts-ignore (define in dts)
  window.arduinoCliAPI = arduinoAPI
}
