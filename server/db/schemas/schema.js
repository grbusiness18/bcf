'use strict'

const mongoose          = require('mongoose')
const Email             = require('mongoose-type-mail')
const mongooseTypeUrl   = require('mongoose-type-url')

/**
 * module which has schema configurations for mongodb
 */

/* Name Value Pair Schema  */
const NameValuePair   = mongoose.Schema({
    "name"            : { type: String, required: true },
    "value"           : { type: String, required: true }
})


/* Source Target Schema  */
const SourceTarget    = mongoose.Schema({
    "source"          : { type: String, default: "text" },
    "target"          : { type: String, default: "text" },
    "_id"             : false
})

/* Only Text Schema */
const response        = mongoose.Schema({
    "text"            : { type: String }
})

/* Actions Schema */
const actions         = mongoose.Schema({
    "destination"     : { type: String, required: true },
    "path"            : { type: String, required: true },
    "method"          : { type: String, required: true, uppercase: true}
})


/*  Entities Schema */
const entities        = mongoose.Schema({
    "name"            : { type: String , required: true },
    "description"     : { type: String , required: true },
    "is_required"     : { type: Boolean, required: true, default: false }
})


/* Credentials Schema */
const credentials     = mongoose.Schema({
    "clientid"        : { type: mongoose.Schema.Types.Mixed, required: true, unique: true, index: true},
    "clientsecret"    : { type: mongoose.Schema.Types.Mixed, required: true, unique: true, index: true},
    "_id"             : false
})

/* NLP schema */
const recast          = mongoose.Schema({
    "token"           : { type: String, required: true},
    "threshold"       : { type: Number, required: true, default: 60},
    "_id"             : false
})


/* Intent Schema for ID and Description. */
const intents         = mongoose.Schema({
    "intent_name"     : { type: String, required: true, lowercase: true},
    "description"     : { type: String, required: true},
    "entities"        : [entities],
    "actions"         : [actions],
    "responses"       : [response],
    "app_id"          : { type: mongoose.Schema.Types.ObjectId, required: true },
    "fallback"        : { type: String, required: false, default: ""},
    "created_on"      : { type: Date,   required: false},
    "changed_on"      : { type: Date,   required: false}
})


/* App Shecma */
const app             = mongoose.Schema({
    "description"     : { type: String, required: true},
    "credentials"     : credentials,
    "recast"          : recast,
    "is_active"       : { type: Boolean, default: true},  
    "created_on"      : { type: Date,   required: false, default: Date.now},
    "changed_on"      : { type: Date,   required: false, default: Date.now}

})

exports.appSchema       = app

exports.intentsSchema   = intents

exports.responsesSchema = response

exports.entitiesSchema  = entities

exports.actionsSchema   = actions