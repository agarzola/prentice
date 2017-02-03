var http = require('http')
var https = require('https')
var fs = require('fs')

var unsecure = require('./servers/unsecure')
var secure = require('./servers/secure')

var certs = {
  key: fs.readFileSync('certs/key.pem'),
  cert: fs.readFileSync('certs/cert.pem')
}

var unsecure_server = http.createServer(unsecure)
var secure_server = https.createServer(certs, secure)

unsecure_server.listen(8079)
secure_server.listen(8080)
console.log('Listening on port 8080…')
