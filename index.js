var http = require('http')

var request_handler = require('./lib/request_handler')
var server = http.createServer(request_handler)

server.listen(8080)
console.log('Listening on port 8080…')
