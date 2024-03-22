'use strict'
const Buffer = require('../util/bufferUtil');
var errors = require('../errors')
var _ = require('../util/_')

module.exports = {
  checkState: function (condition, message) {
    if (!condition) {
      throw new errors.InvalidState(message)
    }
  },
  checkArgument: function (condition, argumentName, message, docsPath) {
    if (!condition) {
      throw new errors.InvalidArgument(argumentName, message, docsPath)
    }
  },
  checkArgumentType: function (argument, type, argumentName) {
    argumentName = argumentName || '(unknown name)'
    if (_.isString(type)) {
      if (type === 'Buffer') {
        // var buffer = require('buffer') // './buffer' fails on cordova & RN
        var buffer = require('buffer/')
        const Buffer = buffer.Buffer
        if (!buffer.Buffer.isBuffer(argument)) {
          throw new errors.InvalidArgumentType(argument, type, argumentName)
        }
      } else if (typeof argument !== type) { // eslint-disable-line
        throw new errors.InvalidArgumentType(argument, type, argumentName)
      }
    } else {
      if (!(argument instanceof type)) {
        throw new errors.InvalidArgumentType(argument, type.name, argumentName)
      }
    }
  }
}
