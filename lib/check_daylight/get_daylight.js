var http = require('http')

var options = {
  hostname: 'api.sunrise-sunset.org',
  path: '/json?lat=35.1601884&lng=-85.4194003&formatted=0',
  method: 'GET'
}

module.exports = get_daylight

function get_daylight () {
  return new Promise((resolve, reject) => {
    var request = http.request(options, response => {
      var raw = ''
      response.on('data', chunk => raw += chunk)
      response.on('end', () => {
        var data = JSON.parse(raw)
        if (data.status === 'OK') {
          return resolve(data.results)
        } else {
          return reject(new Error('DAYLIGHT_SERVER_FAIL'))
        }
      })
    })

    request.on('error', err => {
      return reject(new Error('DAYLIGHT_SERVER_CONNECTION_FAIL'))
    })

    request.end()
  })
}
