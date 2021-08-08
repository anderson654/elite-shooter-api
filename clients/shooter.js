const { io } = require('socket.io-client')

// need http
const socket = io.connect('http://192.168.18.71:3000', {
  transports: ['websocket']
})

socket.on('connect', () => {
  // call the server-side function 'adduser' and send one parameter (value of prompt)
  console.log('conecta')
  console.log(socket.connected)
})

socket.emit('shootingActivity:start', { shootingRangeId: '60f4c7790bfc2e30c57fe63b' })

// socket.on('shootingRange:active', (arg) => {
//   console.log('shootingRange:active')
//   console.log(arg)
// })
