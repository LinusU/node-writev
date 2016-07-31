/* eslint-env mocha */

var writev = require('./')
var assert = require('assert')

function noop () {}

describe('writev', function () {
  it('should concatenate buffers', function (done) {
    function write (chunk, encoding, cb) {
      assert.equal(encoding, 'buffer')
      assert.equal(cb, noop)

      assert.deepEqual(chunk, new Buffer('aabbcc'))

      done()
    }

    var chunks = [
      { encoding: 'buffer', chunk: new Buffer('aa') },
      { encoding: 'buffer', chunk: new Buffer('bb') },
      { encoding: 'buffer', chunk: new Buffer('cc') }
    ]

    writev.call({ _write: write }, chunks, noop)
  })

  it('should convert strings to a buffer', function (done) {
    function write (chunk, encoding, cb) {
      assert.equal(encoding, 'buffer')
      assert.equal(cb, noop)

      assert.deepEqual(chunk, new Buffer('testtest'))

      done()
    }

    var chunks = [
      { encoding: 'utf8', chunk: 'test' },
      { encoding: 'base64', chunk: 'dGVzdA==' }
    ]

    writev.call({ _write: write }, chunks, noop)
  })

  it('should handle mixed chunks', function (done) {
    function write (chunk, encoding, cb) {
      assert.equal(encoding, 'buffer')
      assert.equal(cb, noop)

      assert.deepEqual(chunk, new Buffer('atest'))

      done()
    }

    var chunks = [
      { encoding: 'buffer', chunk: new Buffer('a') },
      { encoding: 'base64', chunk: 'dGVzdA==' }
    ]

    writev.call({ _write: write }, chunks, noop)
  })
})
