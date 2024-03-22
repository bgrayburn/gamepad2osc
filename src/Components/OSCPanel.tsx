import React, { useState, useEffect, MutableRefObject } from "react";
import { toast } from "react-hot-toast";
import OSC from "osc-js";
import Panel from "./Panel";

interface OSCPanelProps {
  oscRef: MutableRefObject<{}>;
}
const OSCPanel = ({ oscRef }: OSCPanelProps) => {
  const [osc, setOsc] = useState(new OSC());
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState(8081);
  const [address, setAddress] = useState("/gamepad/test");

  useEffect(() => {
    oscRef.current = osc;
  }, [osc, oscRef]);

  const connectOSC = (host: string, port: number) => {
    const newOsc = new OSC({ port, host });
    newOsc.open({ port, host });
    newOsc.sendOSCMessage = (message: string) => newOsc.send(message);
    setOsc(newOsc);
    return newOsc;
  };
  const disconnectOSC = () => {
    osc.close();
    osc.disconnect();
  };
  const sendOSCMessage = () => {
    console.log("sending an OSC message");
    const message = new OSC.Message(address);
    toast(
      `Sending ${message.address} ${message.args} to ${osc.options.plugin.host}:${osc.options.plugin.port}`,
    );
    osc.send(message);
  };
  const connectionStatus = osc.options.plugin.socketStatus;
  const sections = [
    {
      title: "Host",
      children: [
        <input
          id="host"
          onChange={(evt) => setHost(evt.target.value)}
          value={host}
        />,
        <span>{osc.options.plugin.host}</span>,
      ],
    },
    {
      title: "Port",
      children: [
        <input
          id="port"
          type="number"
          onChange={(evt) => setPort(parseInt(evt.target.value) || 0)}
          value={port}
        />,
        <span>{osc.options.plugin.port}</span>,
      ],
    },
    {
      title: "Connection Status",
      children: [<span>{connectionStatus}</span>],
    },
    {
      title: "Connection Actions",
      children: [
        <button onClick={() => connectOSC(host, port)}>Connect</button>,
        <button onClick={() => disconnectOSC()}>Disconnect</button>,
      ],
    },
    {
      title: "Test Address",
      children: [
        <input
          id="address"
          onChange={(evt) => setAddress(evt.target.value)}
          value={address}
        />,
        <span>{osc.options.plugin.address}</span>,
      ],
    },
    {
      title: "Send Test Message",
      children: [<button onClick={sendOSCMessage}>send</button>],
    },
  ];
  return <Panel title="OSC" sections={sections} />;
};

export default OSCPanel;
