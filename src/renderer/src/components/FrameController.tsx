import React from 'react'

interface Props {
  currentFrame: number
  frameCount: number
  addFrame: () => void
  deleteFrame: (index: number) => void
  switchFrame: (frame: number) => void
}

const FrameController: React.FC<Props> = ({
  currentFrame,
  frameCount,
  addFrame,
  deleteFrame,
  switchFrame
}) => {
  return (
    <div>
      <button onClick={addFrame}>Add Frame</button>
      <button onClick={() => deleteFrame(currentFrame)} disabled={frameCount === 1}>
        Delete Frame
      </button>
      {[...Array(frameCount).keys()].map((frame) => (
        <button
          key={`frame-${frame}`}
          onClick={() => switchFrame(frame)}
          style={frame === currentFrame ? { backgroundColor: 'blue' } : undefined}
        >
          Frame {frame + 1}
        </button>
      ))}
    </div>
  )
}

export default FrameController
