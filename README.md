# Gamepad2OSC

Using OSC, I commonly found it would be useful to have some kind of hardware to trigger packets for testing or prototyping. To that end I built a webapp that uses the GameController and fetch api
to send OSC messages in response to a game controller connected over bluetooth or usb.

## features

- connect via websockets to a OSC server
- send messages on button press
- send messages on axis change including float values

## setup

- install dependencies with `npm install`
- run the app with `npm start`
- open [http://localhost:3000](http://localhost:3000) to view it in the browser

## TODO

- [ ] split osc and test panels
- [ ] store settings in local storage
- [ ] Ability to save/load mappings/servers
- [ ] Flexbox for buttons in Gamepad section
- [ ] Text for connection status is OSC section
- [ ] Add ability to create mappings by touching button instead of entering its number
  > > > > > > > Stashed changes
