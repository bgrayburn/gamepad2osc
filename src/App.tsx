import React from 'react';
import { Toaster } from 'react-hot-toast'
import './App.css';
import GamepadPanel from './Components/GamepadPanel'
import OSCPanel from './Components/OSCPanel'


function App() {
  
  return (
    <div className="App">
      <GamepadPanel />
      <OSCPanel />
      <Toaster />
    </div>
  );
}

export default App;
