module.exports = (app) => {
    app.controllers = {
        version: require('./version.controller')(app)
    }
}
