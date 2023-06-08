import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    arduinoCliAPI: {
      requestListBoards: (requestData: string) => Promise<string>
      uploadCode: (nameOfFile: string) => void
    }
    jsonsFilesAPI: {
      getFileJsonList: () => Promise<string[]>
    }
  }
}
