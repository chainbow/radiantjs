'use strict'
const Buffer = require('../util/bufferUtil');
var _ = require('../util/_')
var $ = require('../util/preconditions')
var inherits = require('inherits')
var JSUtil = require('../util/js')

var PublicKey = require('../publickey')
var errors = require('../errors')
var Signature = require('../crypto/signature')

/**
 * @desc
 * Wrapper around Signature with fields related to signing a transaction specifically
 *
 * @param {Object|string|TransactionSignature} arg
 * @constructor
 */
function TransactionSignature (arg) {
  if (!(this instanceof TransactionSignature)) {
    return new TransactionSignature(arg)
  }
  if (arg instanceof TransactionSignature) {
    return arg
  }
  if (_.isObject(arg)) {
    return this._fromObject(arg)
  }
  throw new errors.InvalidArgument('TransactionSignatures must be instantiated from an object')
}
inherits(TransactionSignature, Signature)

TransactionSignature.prototype._fromObject = function (arg) {
  this._checkObjectArgs(arg)
  this.publicKey = new PublicKey(arg.publicKey)
  this.prevTxId = Buffer.isBuffer(arg.prevTxId) ? arg.prevTxId : Buffer.from(arg.prevTxId, 'hex')
  this.outputIndex = arg.outputIndex
  this.inputIndex = arg.inputIndex
  this.signature = (arg.signature instanceof Signature) ? arg.signature
    : Buffer.isBuffer(arg.signature) ? Signature.fromBuffer(arg.signature)
      : Signature.fromString(arg.signature)
  this.sigtype = arg.sigtype
  return this
}

TransactionSignature.prototype._checkObjectArgs = function (arg) {
  $.checkArgument(PublicKey(arg.publicKey), 'publicKey')
  $.checkArgument(!_.isUndefined(arg.inputIndex), 'inputIndex')
  $.checkArgument(!_.isUndefined(arg.outputIndex), 'outputIndex')
  $.checkState(_.isNumber(arg.inputIndex), 'inputIndex must be a number')
  $.checkState(_.isNumber(arg.outputIndex), 'outputIndex must be a number')
  $.checkArgument(arg.signature, 'signature')
  $.checkArgument(arg.prevTxId, 'prevTxId')
  $.checkState(arg.signature instanceof Signature ||
               Buffer.isBuffer(arg.signature) ||
               JSUtil.isHexa(arg.signature), 'signature must be a buffer or hexa value')
  $.checkState(Buffer.isBuffer(arg.prevTxId) ||
               JSUtil.isHexa(arg.prevTxId), 'prevTxId must be a buffer or hexa value')
  $.checkArgument(arg.sigtype, 'sigtype')
  $.checkState(_.isNumber(arg.sigtype), 'sigtype must be a number')
}

/**
 * Serializes a transaction to a plain JS object
 * @return {Object}
 */
TransactionSignature.prototype.toObject = TransactionSignature.prototype.toJSON = function toObject () {
  return {
    publicKey: this.publicKey.toString(),
    prevTxId: this.prevTxId.toString('hex'),
    outputIndex: this.outputIndex,
    inputIndex: this.inputIndex,
    signature: this.signature.toString(),
    sigtype: this.sigtype
  }
}

/**
 * Builds a TransactionSignature from an object
 * @param {Object} object
 * @return {TransactionSignature}
 */
TransactionSignature.fromObject = function (object) {
  $.checkArgument(object)
  return new TransactionSignature(object)
}

module.exports = TransactionSignature
