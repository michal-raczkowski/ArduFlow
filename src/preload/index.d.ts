import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    arduinoCliAPI: {
      requestListBoards: (requestData: string) => Promise<string>
      uploadCodeFromFile: (nameOfFile: string) => void
      uploadCodeFromJson: (jsonString: string) => void
    }
    jsonsFilesAPI: {
      getFileJsonList: () => Promise<string[]>
    }
  }
}
