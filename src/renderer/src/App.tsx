import './App.css'
import Button from '@mui/material/Button'

function App() {
  const handleClick = () => {
    // Event handler logic
    console.log('Button clicked!')
    window.arduinoCliAPI.sendDataToMainProcess()
  }

  return (
    <>
      <div>
        <div className="exampleChart"></div>
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
