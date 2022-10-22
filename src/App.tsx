import React, { useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast'
import './App.css';
import { useGamepads } from 'react-gamepads'
import GamepadPanel from './Components/GamepadPanel'
import OSCPanel from './Components/OSCPanel'
import MappingPanel from './Components/MappingPanel'
import OSC from 'osc-js'

interface GamepadRef {
    [key: number]: Gamepad
}

function App() {
  const osc = useRef(new OSC({host:'localhost', port:8081}))
  
  const [ gamepads, setGamepads ] = useState<GamepadRef>({})
  useGamepads((gamepads) => setGamepads(gamepads))
  const gamepad: Gamepad = gamepads[0] 
  return (
    <div className="App">
      <GamepadPanel gamepad={gamepads[0]} />
      <OSCPanel oscRef={osc} />
      <MappingPanel oscRef={osc} gamepad={gamepad} />
      <Toaster />
    </div>
  );
}

export default App;
