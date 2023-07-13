import React from 'react'
import { ILed } from '../interfaces'
import styled from 'styled-components'

interface Props {
  leds: ILed[][]
  onSwitchFrame: () => void
  ledSize: string
  gap: string
}

const Led = styled.div<{ isOn: boolean; ledSize: string }>`
  width: ${({ ledSize }) => ledSize};
  height: ${({ ledSize }) => ledSize};
  background-color: ${({ isOn }) => (isOn ? '#E94C4C' : '#505553')};
  border-radius: 50%;
`

const FrameButton = styled.button`
  margin: 10px;
  border: none;
  padding: 0px;
  background-color: transparent;
`

const FramePreview: React.FC<Props> = ({ leds, onSwitchFrame, ledSize, gap }) => {
  return (
    <div style={{ margin: '10px' }}>
      <FrameButton
        onClick={(e) => {
          e.stopPropagation()
          onSwitchFrame()
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: `${gap}`,
            padding: '0px',
            margin: '0px'
          }}
        >
          {leds.map((row, x) =>
            row.map((led, y) => <Led key={`${x}-${y}`} isOn={led.isOn} ledSize={ledSize} />)
          )}
        </div>
      </FrameButton>
    </div>
  )
}

export default FramePreview
