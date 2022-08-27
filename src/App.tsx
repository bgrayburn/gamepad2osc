import React from 'react';
import logo from './logo.svg';
import './App.css';
import OSC from 'osc-js'

function App() {
  const sendTestOSCMessage = () => {
    console.log('sending an OSC message')

  }
  return (
    <div className="App">
      <div id="gamepad-panel">
        <h2>Gamepad</h2>
      </div> 
      <div id="osc-panel">
        <h2>OSC (test)</h2>
        <button onClick={sendTestOSCMessage}>send</button>
      </div>
    </div>
  );
}

export default App;
