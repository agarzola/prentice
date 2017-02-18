var get_daylight = require('./get_daylight')

module.exports = check_daylight

function check_daylight (right_now) {
  return get_daylight().then(daylight => {
    var sunrise = new Date(daylight.sunrise)
    var sunset = new Date(daylight.sunset)
    if (right_now > sunrise && right_now < sunset) {
      return daylight;
    } else { throw new Error('DAYLIGHT_FAIL')} })
}
