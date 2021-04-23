const initOsc = require('./init-osc')
const initTelnet = require('./init-telnet')

start()

async function start() {
  const connection = await initTelnet()

  initOsc(messageHandler)

  function messageHandler(message) {
    console.log(message)
    if (message.address === '/test/toggle1') {
      if (message.args) {
        const color = message.args[0] === 0 ? 'green' : 'blue'
        connection.exec(
          `control:\r\nbacking color: ${color}\r\n\r\n`,
          function (err, response) {
            console.log('Response: ', response)
          },
        )
      }
    }
  }
}
