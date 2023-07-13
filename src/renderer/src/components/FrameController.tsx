import React from 'react'

interface Props {
  currentFrame: number
  frameCount: number
  addFrame: () => void
  deleteFrame: (index: number) => void
}

const FrameController: React.FC<Props> = ({ currentFrame, frameCount, addFrame, deleteFrame }) => {
  return (
    <div>
      <button onClick={addFrame}>Add Frame</button>
      <button onClick={() => deleteFrame(currentFrame)} disabled={frameCount === 1}>
        Delete Frame
      </button>
    </div>
  )
}

export default FrameController
