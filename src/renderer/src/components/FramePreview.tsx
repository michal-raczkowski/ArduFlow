import React from 'react'
import { ILed } from '../interfaces'
import styled from 'styled-components'

interface Props {
  leds: ILed[][]
  onSwitchFrame: () => void
  onDeleteFrame: () => void
  ledSize: string
  gap: string
}

const Led = styled.div<{ isOn: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ isOn }) => (isOn ? 'red' : 'grey')};
  margin: 1px;
`

const FramePreview: React.FC<Props> = ({ leds, onSwitchFrame, onDeleteFrame, ledSize, gap }) => {
  return (
    <div style={{ margin: '10px' }}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSwitchFrame()
        }}
      >
        Switch to this frame
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDeleteFrame()
        }}
      >
        Delete this frame
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '2px',
          width: `calc(8 * (${ledSize} + ${gap} * 2))`,
          margin: '10px'
        }}
      >
        {leds.map((row, x) => row.map((led, y) => <Led key={`${x}-${y}`} isOn={led.isOn} />))}
      </div>
    </div>
  )
}

export default FramePreview
