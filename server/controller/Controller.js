'use strict'
const logger = require('../../utility/logger')
const AppController = require('./AppController.js')
const CoreController = require('./CoreController.js')
const IntentController = require('./IntentController.js')
const SubSectionController = require('./SubSectionController.js')


/**
 *  Generic Controller which facilitates routing to differnt controlles based on requests. 
 */


/**
 * [DEFAULT Controller: channels to CORE Controller]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.Core = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            break

        case 'POST':
            CoreController.POST(req, res, next)
            break

        case 'PUT':
            break

        case 'DELETE':
            break

        case 'default':
            break
    }
}


/**
 * [DEFAULT Controller: channels to APP controllers]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.App = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            AppController.GET(req, res, next)
            break

        case 'POST':
            console.log("POST APPS")        
            AppController.POST(req, res, next)
            break

        case 'PUT':
            AppController.PUT(req, res, next)
            break

        case 'DELETE':
            AppController.DELETE(req, res, next)
            break

        case 'default':
            break
    }
}


/**
 * [DEFAULT Controller: channels to INTENT Controller]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.Intent = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            IntentController.GET(req, res, next)
            break

        case 'POST':
            IntentController.POST(req, res, next)
            break

        case 'PUT':
            IntentController.PUT(req, res, next)
            break

        case 'DELETE':
            IntentController.DELETE(req, res, next)
            break

        case 'default':
            break
    }
}


/**
 * [DEFAULT Controller: channels to SUBSECTION controller which handles RESPONSES segment in INTENTS]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.IntentResponses = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            SubSectionController.GET(req, res, next, "responses")
            break

        case 'POST':
            SubSectionController.POST(req, res, next, "responses")
            break

        case 'PUT':
            SubSectionController.PUT(req, res, next, "responses")
            break

        case 'DELETE':
            SubSectionController.DELETE(req, res, next, "responses")
            break

        case 'default':
            break
    }
}

/**
 * [DEFAULT Controller: channels to SUBSECTION controller which handles ENTITIES segment in INTENTS]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.IntentEntities = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            SubSectionController.GET(req, res, next, "entities")
            break

        case 'POST':
            SubSectionController.POST(req, res, next, "entities")
            break

        case 'PUT':
            SubSectionController.PUT(req, res, next, "entities")
            break

        case 'DELETE':
            SubSectionController.DELETE(req, res, next, "entities")
            break

        case 'default':
            break
    }
}

/**
 * [DEFAULT Controller: channels to SUBSECTION controller which handles ACTIONS segment in INTENTS]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.IntentActions = (req, res, next) => {

    switch (req.method) {
        case 'GET':
            SubSectionController.GET(req, res, next, "actions")
            break

        case 'POST':
            SubSectionController.POST(req, res, next, "actions")
            break

        case 'PUT':
            console.log("IntentActions - PUT")
            SubSectionController.PUT(req, res, next, "actions")
            break

        case 'DELETE':
            SubSectionController.DELETE(req, res, next, "actions")
            break

        case 'default':
            break
    }
}