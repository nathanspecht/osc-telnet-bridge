const initOsc = require('./init-osc')
const initTelnet = require('./init-telnet')

start()

async function start() {
  const connection = await initTelnet()

  initOsc(messageHandler)

  function messageHandler(message) {
    if (!message?.address) return
    const [, page, inputType, command] = message.address.split('/')

    let value

    if (inputType === 'toggle') {
      value = message.args[0] === 0 ? 'off' : 'on'
    }

    if (inputType === 'value') {
      value = message.args[0]
    }

    console.log({ page, inputType, command, value })

    connection.exec(
      `control:\r\n${command}: ${value}\r\n\r\n`,
      function (err, response) {
        if (response) console.log(response)
      },
    )
  }
}
