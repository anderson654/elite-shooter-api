const { io } = require('socket.io-client')

// need http
const socket = io.connect('http://192.168.18.69:3000', {
  transports: ['websocket']
})

socket.on('connect', () => {
  // call the server-side function 'adduser' and send one parameter (value of prompt)
  console.log('conecta')
  console.log(socket.connected)
})

socket.emit('dashboard:start', ['1', '2', '3'])

socket.on('shootingRange:active', (arg) => {
  console.log('shootingRange:active')
  console.log(arg)
})
