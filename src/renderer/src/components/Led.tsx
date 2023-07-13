import React from 'react'
import { ILed } from '../interfaces'
import styled from 'styled-components'

interface Props {
  led: ILed
  toggleLed: (x: number, y: number) => void
}

const StyledButton = styled.button<ILed>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isOn ? '#E94C4C' : '#505553')};
  border: 0px;
`

const Led: React.FC<Props> = ({ led, toggleLed }) => {
  const { x, y } = led

  const handleClick = () => {
    toggleLed(x, y)
  }

  return <StyledButton {...led} onClick={handleClick} />
}

export default Led
