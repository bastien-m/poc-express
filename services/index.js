module.exports = (app) => {
    app.services = {
        version: require('./version.service')(app)
    }
}