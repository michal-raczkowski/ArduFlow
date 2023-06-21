import React from 'react'
import { ILed } from '../interfaces'

interface Props {
  state: ILed[][][]
  width: string
  height: string
}

const CodeGeneratorUI: React.FC<Props> = ({ state, width, height }) => {
  const generateCode = () => {
    const frames = state.map((frame) =>
      frame.map((row) => row.map((led) => (led.isOn ? '1' : '0')).join(''))
    )

    const jsonString = JSON.stringify({ array: frames }, null, 2)

    return jsonString
  }

  return (
    <div style={{ width, height }}>
      <pre>{generateCode()}</pre>
    </div>
  )
}

export default CodeGeneratorUI
