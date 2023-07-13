import React from 'react'
import { ILed } from '../interfaces'
import LedMatrix from './LedMatrix'

interface Props {
  leds: ILed[][]
  toggleLed: (x: number, y: number) => void
  ledSize: string
  gap: string
}

const Frame: React.FC<Props> = ({ leds, toggleLed, ledSize, gap }) => {
  return (
    <div style={{ border: '5px solid #50555333', padding: '51px', borderRadius: '50px' }}>
      <LedMatrix state={{ leds }} toggleLed={toggleLed} ledSize={ledSize} gap={gap} />
    </div>
  )
}

export default Frame
