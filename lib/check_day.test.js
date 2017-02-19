var should = require('should')
var sinon = require('sinon')
var check_day = require('./check_day')

describe('check_day', () => {
  it('returns a promise', done => {
    var right_now = new Date()
    var promise = check_day(right_now)
    promise.should.be.instanceOf(Promise)
    promise.then(() => { done() })
  })

  it('rejects the wrong day of week', done => {
    var right_now = new Date()
    Promise.all([
      check_day(generate_last_day(right_now, 0))
        .then(() => {throw new Error('Wrong day not rejected: ' + 0)})
        .catch(err => err.message.should.eql('DAY_FAIL')),
      check_day(generate_last_day(right_now, 1))
        .then(() => {throw new Error('Wrong day not rejected: ' + 1)})
        .catch(err => err.message.should.eql('DAY_FAIL')),
      check_day(generate_last_day(right_now, 2))
        .then(() => {throw new Error('Wrong day not rejected: ' + 2)})
        .catch(err => err.message.should.eql('DAY_FAIL')),
      check_day(generate_last_day(right_now, 3))
        .then(() => {throw new Error('Wrong day not rejected: ' + 3)})
        .catch(err => err.message.should.eql('DAY_FAIL'))
    ]).then(() => done()).catch(done)
  })

  it('passes the right day of week', done => {
    var right_now = new Date()
    Promise.all([
      check_day(generate_last_day(right_now, 4)),
      check_day(generate_last_day(right_now, 5)),
      check_day(generate_last_day(right_now, 6))
    ]).then(() => done()).catch(done)
  })
})

function generate_last_day (right_now, requested_weekday) {
  var today_date = right_now.getDate()
  var today_weekday = right_now.getDay()
  var new_date = new Date()
  new_date.setDate(today_date - (today_weekday - requested_weekday))
  return new_date
}
