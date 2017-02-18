var fs = require('fs')
var hunt_dates = JSON.parse(fs.readFileSync('./data/hunt_dates.json'))

module.exports = check_hunt_dates

function check_hunt_dates (right_now) {
  var today_is_hunt_day = hunt_dates.some(date => {
    date += 'T00:00:00-05:00'
    return new Date(right_now).setHours(0,0,0,0) == new Date(date).setHours(0,0,0,0)
  })
  if (today_is_hunt_day) {
    throw new Error('HUNT_DATE_FAIL')
  } else {
    return
  }
}
