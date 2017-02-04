var check_day = require('../lib/check_day')

module.exports = route

function route (req, res) {
  var right_now = new Date()
  if (req.url !== '/') {
    res.statusCode = 404
    return res.end()
  }

  res.setHeader('Content-Type', 'text/html')

  check_day(right_now)
  .then(() => {
    res.end('YES') })
  .catch(e => {
    console.log(e)
    res.end('NO') })
}
