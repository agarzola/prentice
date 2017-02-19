var check_day = require('./check_day')
var check_hunt_dates = require('./check_hunt_dates')
var check_daylight = require('./check_daylight')

var pug = require('pug')
var fs = require('fs')
var template = pug.compileFile('./views/index.pug')

module.exports = route

function route (req, res) {
  var right_now = new Date()
  if (req.url !== '/') {
    res.statusCode = 404
    return res.end()
  }

  res.setHeader('Content-Type', 'text/html')

  check_day(right_now)
  .then(() => check_hunt_dates(right_now))
  .then(() => check_daylight(right_now))
  .then(() => {
    res.end(template({ open: true })) })
  .catch(e => {
    var reason
    switch (e.message) {
      case 'DAY_FAIL':
        reason = 'Today is not Thursday, Friday, or Saturday.'
        break
      case 'DAYLIGHT_FAIL':
        reason = 'The sun is not out.'
        break
      case 'HUNT_DATE_FAIL':
        reason = 'There is a managed hunt today.'
    }
    res.end(template({ open: false, reason: reason })) })
}
