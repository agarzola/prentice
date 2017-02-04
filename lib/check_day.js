module.exports = check_day

function check_day (right_now) {
  return new Promise((resolve, reject) => {
    if (right_now.getDay() > 3 && right_now.getDay() < 7) {
      return resolve()
    } else { return reject(new Error('DAY_FAIL')) }
  })
}
