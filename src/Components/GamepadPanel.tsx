import React, { useState } from 'react'
import { useGamepads } from 'react-gamepads'


interface GamepadRef {
    [key: number]: Gamepad
}

const GamepadPanel = () => {
  const [ gamepads, setGamepads ] = useState<GamepadRef>([])
  useGamepads((gamepads: GamepadRef) => setGamepads(gamepads))
  const gamepadConnectionStatus = Object.keys(gamepads).length > 0 ? 'Connected': 'Not Connected'
  return <div id="gamepad-panel">
    <h2>Gamepad</h2>
    <span><h3>Connection Status</h3>{gamepadConnectionStatus}</span>
    <span><h3>Gamepads</h3>
      <span><h4>Connection Status</h4>
        {gamepadConnectionStatus}
      </span>
      {
        gamepadConnectionStatus == 'Connected' ?
          <GamepadDisplay gamepad={gamepads[0]} /> :
          '---'
      }
    </span>
  </div>

}

const ButtonDisplay = ({button}: any) => {
  return <span>
    {JSON.stringify(button)}
  </span>
}

interface GamepadDisplayProps {
    gamepad: Gamepad
}
const GamepadDisplay = ({gamepad}: GamepadDisplayProps) => {
  return <div>
    <span><h4>Name</h4>
      {gamepad.id}
    </span>
    <span><h4>Axes</h4>
      {gamepad.axes}
    </span>
    <span>
      <h4>Buttons</h4>
      {
        gamepad.buttons.map((b, i) => <ButtonDisplay button={b} key={i}/>)
      }
    </span>
  </div>
}

export default GamepadPanel