const Telnet = require('telnet-client')

module.exports = function () {
  return new Promise((resolve, reject) => {
    const params = {
      host: '192.168.10.220',
      port: '9998',
      shellPrompt: '',
      timeout: 0,
    }

    const connection = new Telnet()

    connection.on('ready', function (prompt) {
      console.log('telnet connection ready')
      resolve(connection)
    })

    connection.on('timeout', function () {
      console.log('socket timeout!')
      connection.end()
    })

    connection.on('close', function () {
      console.log('connection closed')
    })

    connection.on('error', function (e) {
      console.log(e)
    })

    connection.connect(params)
  })
}
