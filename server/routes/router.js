'use strict'

/* Declaration of required modules and variables */
const express = require('express')
const oROUTER = express.Router()
const Controller = require('../controller/Controller')
const jwt = require('jsonwebtoken')
const passport = require('passport').Passport
const AppPassport = new passport()

require('../auth/authorize.js')(AppPassport)

oROUTER.use(AppPassport.initialize())

oROUTER.get('/', (req, res, next)=>{
    res.send("App is running!!")
})


// General Routes
oROUTER.post('/oauth/token',Controller.Core)
oROUTER.post('/parse',  
AppPassport.authenticate('jwt', { session: false }),  Controller.Core)

// App Routes
oROUTER.get('/apps/:appid',Controller.App)
oROUTER.get('/apps/all',Controller.App)
oROUTER.put('/apps/:appid',Controller.App)
oROUTER.post('/apps/create',Controller.App)
oROUTER.delete('/apps/:appid',Controller.App)

// Api Routes
oROUTER.get('/apps/:appid/intents/name/:name', Controller.Intent)
oROUTER.get('/apps/:appid/intents/:intentid', Controller.Intent)
oROUTER.get('/apps/:appid/intents/all', Controller.Intent)
oROUTER.put('/apps/:appid/intents/:intentid', Controller.Intent)
oROUTER.post('/apps/:appid/intents/create', Controller.Intent)
oROUTER.delete('/apps/:appid/intents/:intentid',Controller.Intent)

// Api Intent / Responses
oROUTER.get('/apps/:appid/intents/:intentid/responses/all', Controller.IntentResponses)
oROUTER.post('/apps/:appid/intents/:intentid/responses/create',Controller.IntentResponses)
oROUTER.put('/apps/:appid/intents/:intentid/responses/:responseid', Controller.IntentResponses)
oROUTER.delete('/apps/:appid/intents/:intentid/responses/:responseid',Controller.IntentResponses)
oROUTER.delete('/apps/:appid/intents/:intentid/responses/all', Controller.IntentResponses)

// Api Intent / entities
oROUTER.get('/apps/:appid/intents/:intentid/entities/all', Controller.IntentEntities)
oROUTER.post('/apps/:appid/intents/:intentid/entities/create',Controller.IntentEntities)
oROUTER.put('/apps/:appid/intents/:intentid/entities/:entityid', Controller.IntentEntities)
oROUTER.delete('/apps/:appid/intents/:intentid/entities/:entityid',Controller.IntentEntities)
oROUTER.delete('/apps/:appid/intents/:intentid/entities/all',Controller.IntentEntities)

// Api Intent / actions
oROUTER.get('/apps/:appid/intents/:intentid/actions/all',           Controller.IntentActions)
oROUTER.post('/apps/:appid/intents/:intentid/actions/create',       Controller.IntentActions)
oROUTER.put('/apps/:appid/intents/:intentid/actions/:actionid',        Controller.IntentActions)
oROUTER.delete('/apps/:appid/intents/:intentid/actions/:actionid',     Controller.IntentActions)
oROUTER.delete('/apps/:appid/intents/:intentid/actions/all',        Controller.IntentActions)


module.exports = oROUTER