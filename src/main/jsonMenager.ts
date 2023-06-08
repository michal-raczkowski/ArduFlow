import fs from 'fs'
import path from 'path'

const folderPath = path.resolve(process.cwd(), 'src/jsons')

export async function listFilesInFolder(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err)
        return
      }

      const fileList: string[] = []

      // Use Promise.all to asynchronously check if each item is a file
      Promise.all(
        files.map((file) => {
          return new Promise<void>((resolveStat, rejectStat) => {
            const filePath = `${folderPath}/${file}`
            fs.stat(filePath, (errStat, stats) => {
              if (errStat) {
                rejectStat(errStat)
                return
              }

              if (stats.isFile()) {
                fileList.push(file)
              }

              resolveStat()
            })
          })
        })
      )
        .then(() => {
          resolve(fileList)
        })
        .catch((errStat) => {
          reject(errStat)
        })
    })
  })
}
