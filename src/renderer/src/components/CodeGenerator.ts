import { ILed } from '../interfaces'

function CodeGenerator(state: ILed[][][]) {
  const frames = state.map((frame) =>
    frame.map((row) => row.map((led) => (led.isOn ? '1' : '0')).join(''))
  )

  const jsonString = JSON.stringify({ array: frames }, null, 2)

  return jsonString
}

export default CodeGenerator
