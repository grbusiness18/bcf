'use strict'

const mongoose          = require('mongoose')
const schema            = require('../schemas/schema.js')

exports.intentdb        = mongoose.model('IntentDB', schema.intentsSchema)
exports.appdb           = mongoose.model('ApplicationDB', schema.appSchema)