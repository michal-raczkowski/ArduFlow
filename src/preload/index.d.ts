import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    arduinoCliAPI: {
      requestListBoards: () => Promise<string>
      uploadCodeFromFile: (nameOfFile: string) => void
      uploadCodeFromJson: (jsonString: string, port: string) => void
      getAvailablePorts: () => Promise<string[]>
    }
    jsonsFilesAPI: {
      getFileJsonList: () => Promise<string[]>
    }
  }
}
