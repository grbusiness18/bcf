'use strict'
const logger = require('../../utility/logger')
const AppDBHandler = require('../db/api/appdbhandler.js')
const schemaItems = require('../db/schemas/schema.js')
const TokenGenerator = require('uuid-token-generator')

/**
 * APP controller class handles all the HTTP requests for apps specific routes
 */



/**
 * [APP Controller: POST Method Handler for creating new APPS]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.POST = (req, res, next) => {
    var odata = req.body
    console.log(odata)
    if (JSON.stringify(odata) == "") {
        var error = new Error("Empty Body for App creation")
        error.status = 405
        next(error)
    } else {


        const clientsecret = new TokenGenerator(512, TokenGenerator.BASE62).generate()
        const clientid = new TokenGenerator(256, TokenGenerator.BASE62).generate()
        odata["credentials"] = {
            "clientid": clientid,
            "clientsecret": clientsecret
        }

        if (("description" in odata) && ("recast" in odata)) {

            if ("token" in odata.recast == false) {
                console.log("no token")
                var error = new Error("Recast Token")
                error.status = 405
                next(error)
            }

            if ("threshold" in odata.recast == false) {
                odata.recast["threshold"] = 60
            }

            if (odata.description == "") {
                var error = new Error("Empty APP description")
                error.status = 405
                next(error)
            } else {
                console.log(odata)
                new AppDBHandler().createNewApp(odata).then((data) => {
                    res.status(201).send(data)
                }).catch((err) => {
                    res.status(500).send(err)
                })

            }

        } else {
            logger.error("empty body")
            var error = new Error("Empty App Description or NLP configurations is missing")
            error.status = 405
            next(error)
        }
    }
}

/**
 * [APP Controller: GET Method handler for routes = all / name / appid  to take care of READ operations]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.GET = (req, res, next) => {
    logger.info("Get Method", req.path)
    if (req.path == "/apps/all") {
        new AppDBHandler().getAllApps().then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            logger.error(err.message)
            res.status(500).send(err)
        })
    } else {

        var query = {}
        if (req.path == "/apps/name/" + req.params.name) {
            query["App_name"] = req.params.name
        }

        if (req.path == "/apps/" + req.params.appid) {
            query["_id"] = req.params.appid
        }
        logger.info(query)
        new AppDBHandler().getApp(query).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err.message)
        })
    }
}


/**
 * [APP Controller : PUT Method handler deals with DB updates]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.PUT = (req, res, next) => {
    if (req.params.name == "") {
        res.status(405).send(new Error("App Name is Empty"))
    } else {
        var query = {}
        query["_id"] = req.params.appid

        new AppDBHandler().updateApp(query, req.body).then((data) => {
            res.status(201).send(data)
        }).catch((err) => {
            res.status(500).send(err)
        })
    }
}


/**
 * [APP Controller : DELETE method handler to take care of delete operation]
 * @param  {Object}   req  [Request Object]
 * @param  {Object}   res  [Response Object]
 * @param  {Function} next [Next Function]
 */
exports.DELETE = (req, res, next) => {
    if (req.params.name == "") {
        res.status(500).send(new Error("App Name is Empty"))
    } else {
        var query = {}
        query["_id"] = req.params.appid

        new AppDBHandler().deleteApp(query).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
        })
    }
}

