const l = require('./helpers/logger').logger
const { respond, respondWithException } = require('./helpers/respond')

const loadDependency = (app) => {
    // can be used to add any kind of dependency to the app
}

const helpers = {
    respond,
    respondWithException,
    l,
}

module.exports = {
    helpers,
    loadDependency,
}
