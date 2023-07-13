import { useState, useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button'
import SelectableList from './components/SelectableList'
import logo from './assets/ArduFlowLogo.png'
import { ILed } from './interfaces'
import CodeGeneratorUI from './components/CodeGeneratorUI'
import CodeGenerator from './components/CodeGenerator'
import FrameController from './components/FrameController'
import Frame from './components/Frame'
import FramePreview from './components/FramePreview'
import { ArduinoPortsDropdown } from './components/ArduinoPortsDropdown'

const arduinoAPI = window.arduinoCliAPI
const jsonsAPI = window.jsonsFilesAPI

const initialFrame: ILed[][] = Array.from({ length: 8 }, (_, x) =>
  Array.from({ length: 8 }, (_, y) => ({ isOn: false, x, y }))
)

const initialState: ILed[][][] = [initialFrame]

function App() {
  const [jsonList, setJsonList] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState('')
  const [ports, setPorts] = useState<string[]>([])
  const [selectedPort, setSelectedPort] = useState<string>(' ')

  useEffect(() => {
    jsonsAPI
      .getFileJsonList()
      .then((fileList) => {
        setJsonList(fileList)
      })
      .catch((error) => {
        console.error('Error retrieving file list:', error)
      })

    arduinoAPI
      .getAvailablePorts()
      .then((portsList) => {
        portsList.unshift(' ')
        console.log(portsList)
        setPorts(portsList)
      })
      .catch((error) => {
        console.error('Error retrieving port list:', error)
      })
  }, [])

  const handleClick = () => {
    const port = '/' + selectedPort.slice(1).split(' ')[0]
    console.log(port)
    arduinoAPI.uploadCodeFromJson(CodeGenerator(state), port)
  }

  const handlePortChange = (port: string) => {
    setSelectedPort(port)
  }
  useEffect(() => {
    console.log(ports)
  }, [ports])

  useEffect(() => {
    console.log(selectedItem)
  }, [selectedItem])

  const [state, setState] = useState<ILed[][][]>(initialState)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  const toggleLed = (x: number, y: number) => {
    setState((prevState) => {
      const newFrame = prevState[currentFrame].map((row) =>
        row.map((led) => (led.x === x && led.y === y ? { ...led, isOn: !led.isOn } : led))
      )

      return [...prevState.slice(0, currentFrame), newFrame, ...prevState.slice(currentFrame + 1)]
    })
  }

  const addFrame = () => {
    const newFrame: ILed[][] = state[currentFrame]

    setState((prevState) => [...prevState, newFrame])
    setCurrentFrame((prevState) => prevState + 1)
  }
  const deleteFrame = (index: number) => {
    if (state.length === 1) return

    setState((prevState) => {
      return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
    })

    setCurrentFrame((prevState) => Math.max(prevState - 1, 0))
  }

  const switchFrame = (index: number) => {
    setCurrentFrame(index)
  }

  return (
    <>
      <div>
        <FrameController
          currentFrame={currentFrame}
          frameCount={state.length}
          addFrame={addFrame}
          deleteFrame={deleteFrame}
        />
        {state.map((leds, index) => (
          <FramePreview
            key={index}
            leds={leds}
            onSwitchFrame={() => switchFrame(index)}
            ledSize="15px"
            gap="5px"
          />
        ))}
        <Frame leds={state[currentFrame]} toggleLed={toggleLed} ledSize="50px" gap="20px" />
      </div>

      <Button variant="contained" color="primary" onClick={handleClick}>
        Click me
      </Button>
      <div>
        <label>I ❤️ Available 🖤 ports:</label>
        <ArduinoPortsDropdown
          ports={ports}
          selectedPort={selectedPort}
          onPortChange={handlePortChange}
        />
      </div>
    </>
  )
}

export default App
