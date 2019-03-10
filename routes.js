const ApplicationError = require('./models/application.error');

module.exports = (app) => {
    app.post('/version', app.modules.csrfProtection, app.controllers.version.create),
    app.post('/version/:id', app.modules.csrfProtection, app.controllers.version.modify),
    app.get('/version/creer', app.controllers.version.createForm),
    app.get('/version/:id/:action(afficher|editer)', app.controllers.version.get),
    app.get('/version', app.controllers.version.getAll),
    app.get('*', (req, res) => res.render('erreur', {
        title: 'Erreur 404',
        erreur: new ApplicationError(404, 'Page introuvable')
    }))
}
