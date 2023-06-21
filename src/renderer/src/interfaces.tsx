export interface ILed {
  x: number
  y: number
  isOn: boolean
}

export interface IState {
  leds: ILed[][]
}
