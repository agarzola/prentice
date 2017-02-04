var check_day = require('../lib/check_day')
var check_hunt_dates = require('../lib/check_hunt_dates')
var check_daylight = require('../lib/check_daylight')

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
    res.end('YES') })
  .catch(e => {
    console.log(e)
    res.end('NO') })
}
