import { useState, useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button'
import SelectableList from './components/SelectableList'

const arduinoAPI = window.arduinoCliAPI
const jsonsAPI = window.jsonsFilesAPI

function App() {
  const [jsonList, setJsonList] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState('')
  useEffect(() => {
    jsonsAPI
      .getFileJsonList()
      .then((fileList) => {
        setJsonList(fileList)
      })
      .catch((error) => {
        console.error('Error retrieving file list:', error)
      })
  }, [])

  const [list, setList] = useState('list')

  const handleClick = () => {
    // Event handler logic
    console.log('Button clicked!')
    arduinoAPI.uploadCode(selectedItem)
  }

  useEffect(() => {
    console.log(selectedItem)
  }, [selectedItem])

  return (
    <>
      <div>
        <div className="exampleChart"></div>
        <SelectableList items={jsonList} onSelect={setSelectedItem} />
      </div>
      <div className="card">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Click me
        </Button>
        <p>
          Test of <code>ArduFlow</code> library
        </p>
      </div>
      <p className="read-the-docs">Project to upload sketches to arduino</p>
    </>
  )
}

export default App
