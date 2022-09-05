import React, { useState } from 'react'
import Panel from './Panel'
import { useGamepads } from 'react-gamepads'


interface GamepadRef {
    [key: number]: Gamepad
}

const GamepadPanel = () => {
  const [ gamepads, setGamepads ] = useState<GamepadRef>([])
  useGamepads((gamepads: GamepadRef) => setGamepads(gamepads))
  const gamepadConnectionStatus = Object.keys(gamepads).length > 0 ? 'Connected': 'Not Connected'
  const sections = [
    {
      title: 'Connection Status',
      children: [
        <span>{gamepadConnectionStatus}</span>
      ]
    },
    {
      title: 'Gamepads',
      children: [
        <span>
          {
            gamepadConnectionStatus === 'Connected' ?
              <GamepadDisplay gamepad={gamepads[0]} /> :
              '---'
          }
        </span>  
      ]
    }
  ]
  return <Panel title='Gamepad' sections={sections} />
}

interface ButtonDisplayProps {
    button: GamepadButton
    key: number
}
const ButtonDisplay = ({button, key}: ButtonDisplayProps) => {
  return <div>
    <h5>{key}</h5>
    {button.pressed ? 'pressed' : 'not pressed'}
  </div>
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
