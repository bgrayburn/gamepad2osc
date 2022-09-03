import React from 'react';
import './App.css';
import GamepadPanel from './Components/GamepadPanel'
import OSCPanel from './Components/OSCPanel'


function App() {
  
  return (
    <div className="App">
      <GamepadPanel />
      <OSCPanel />
    </div>
  );
}

export default App;
