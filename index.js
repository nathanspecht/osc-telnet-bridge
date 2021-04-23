const initOsc = require('./init-osc')
const initTelnet = require('./init-telnet')
const customValues = require('./custom-values')

start()

async function start() {
  const connection = await initTelnet()

  initOsc(messageHandler)

  function messageHandler(message) {
    if (!message?.address) return
    let [, page, inputType, command, column, row] = message.address.split('/')

    let value

    if (inputType === 'toggle') {
      value = message.args[0] === 0 ? 'off' : 'on'
    }

    if (inputType === 'number') {
      value = message.args[0]
    }

    if (inputType === 'custom') {
      if (message.args[0] === 1) {
        column = parseInt(column) - 1
        row = parseInt(row) - 1
        value = customValues[command][row][column]
      }
    }

    if (typeof value !== 'undefined') {
      console.log(message)
      console.log({ page, inputType, command, value, row, column })

      connection.exec(
        `control:\r\n${command}: ${value}\r\n\r\n`,
        function (err, response) {
          if (response) console.log(response)
        },
      )
    }
  }
}
