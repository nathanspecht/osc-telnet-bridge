const osc = require('osc')

module.exports = function (messageHandler) {
  var getIPAddresses = function () {
    var os = require('os'),
      interfaces = os.networkInterfaces(),
      ipAddresses = []

    for (var deviceName in interfaces) {
      var addresses = interfaces[deviceName]
      for (var i = 0; i < addresses.length; i++) {
        var addressInfo = addresses[i]
        if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
          ipAddresses.push(addressInfo.address)
        }
      }
    }

    return ipAddresses
  }

  var udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 57121,
  })

  udpPort.on('ready', function () {
    var ipAddresses = getIPAddresses()

    console.log('Listening for OSC over UDP.')
    ipAddresses.forEach(function (address) {
      console.log(' Host:', address + ', Port:', udpPort.options.localPort)
    })
  })

  udpPort.on('message', function (oscMessage) {
    messageHandler(oscMessage)
  })

  udpPort.on('error', function (err) {
    console.log(err)
  })

  udpPort.open()
}
