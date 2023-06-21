import React from 'react'
import { IState } from '../interfaces'
import Led from './Led'
import { StyledLedMatrix } from './styled'

interface Props {
  state: IState
  toggleLed: (x: number, y: number) => void
  ledSize: string
  gap: string
}

const LedMatrix: React.FC<Props> = ({ state, toggleLed, ledSize, gap }) => {
  return (
    <StyledLedMatrix ledSize={ledSize} gap={gap}>
      {state.leds.map((row, x) =>
        row.map((led, y) => <Led key={`led-${x}-${y}`} led={led} toggleLed={toggleLed} />)
      )}
    </StyledLedMatrix>
  )
}

export default LedMatrix
