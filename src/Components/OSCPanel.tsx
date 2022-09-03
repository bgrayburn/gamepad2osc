import React from 'react'
import OSC from 'osc-js'

const OSCPanel = () => {
  const plugin = new OSC.WebsocketClientPlugin({ port: 8081 })
  const osc = new OSC({ plugin })
  osc.open()
  const sendTestOSCMessage = () => {
    console.log('sending an OSC message')
    const message = new OSC.Message('/gamepad/test')
    osc.send(message)
  }
  
  const connectionStatus = 'true'
  return <div id="osc-panel">
    <h2>OSC (test)</h2>
    <span><h3>Connection Status</h3>{connectionStatus}</span>
    <span><h3>Send Test Message</h3><button onClick={sendTestOSCMessage}>send</button></span>
  </div>
}

export default OSCPanel