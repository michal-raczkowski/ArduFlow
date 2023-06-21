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
  return <LedMatrix state={{ leds }} toggleLed={toggleLed} ledSize={ledSize} gap={gap} />
}

export default Frame
