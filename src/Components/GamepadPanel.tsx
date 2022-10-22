import React, { useState, MutableRefObject } from 'react'
import Panel from './Panel'
import { useGamepads } from 'react-gamepads'

interface GamepadRef {
    [key: number]: Gamepad
}

interface GamepadPanelProps {
  gamepad: Gamepad
}
const GamepadPanel = ({ gamepad }: GamepadPanelProps) => {
  const gamepadConnectionStatus = Boolean(gamepad) ? 'Connected' : 'Not Connected'
  const sections = [
    {
      title: 'Connection Status',
      children: [
        <span key='status'>{gamepadConnectionStatus}</span>
      ]
    },
    {
      title: 'Gamepads',
      children: [
        <span key='gamepads'>
          {
            gamepadConnectionStatus === 'Connected' ?
              <GamepadDisplay gamepad={gamepad} /> :
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
    index: number
}
const ButtonDisplay = ({button, index}: ButtonDisplayProps) => {
  return <div style={{display: 'inline', padding: '10px'}}>
    {index}: {button.pressed ? 'pressed' : 'not pressed'}
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
        gamepad.buttons.map((b, i) => <ButtonDisplay button={b} key={i} index={i} />)
      }
    </span>
  </div>
}

export default GamepadPanel
