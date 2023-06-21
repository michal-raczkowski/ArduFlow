import { ILed } from '../interfaces'

interface Props {
  state: ILed[][][]
  width: string
  height: string
}

function CodeGenerator(props: Props) {
  const frames = props.state.map((frame) =>
    frame.map((row) => row.map((led) => (led.isOn ? '1' : '0')).join(''))
  )

  const jsonString = JSON.stringify({ array: frames }, null, 2)

  return jsonString
}

export default CodeGenerator
