const ApplicationErreur = require('../models/application.error');
const moment = require('moment');

module.exports = (app) => {

    const get = (req, res) => {
        const { id, action } = req.params;
        app.services.version.get(id)
            .then(version =>  res.render('version/creer', {
                actionUrl: `/version/${id}`,
                verb: 'post',
                csrfToken: req.csrfToken(),
                title: `Livraison ${version.tag}`,
                livraison: version,
                lectureSeule: action === 'afficher' ? true : false
            }))
            .catch(erreur => {res.render('erreur', { title: 'Erreur',erreur })});
        
    };

    const createForm = (req, res) => { 
        res.render('version/creer', {
            actionUrl: '/version',
            verb: 'post',
            csrfToken: req.csrfToken(),
            title: 'Créer une nouvelle livraison',
            livraison: {
                tag: '',
                createur: '',
                date_deploiement: moment().format('YYYY-MM-DD')
            },
            lectureSeule: false
        }
    )}

    const modify = (req, res) => {
        const id = req.params.id;
        if (id !== req.body.id) {
            return res.render('erreur', {
                title: 'Erreur - modification',
                erreur: new ApplicationErreur(400, `Tentative de modification d'un élément non autorisé`)
            });
        } else {
            app.services.version.update(req.body)
                .then(livraison => res.redirect(`/version`))
                .catch(erreur =>  res.render('erreur', {
                        title: 'Erreur - modification',
                        erreur
                    })
                )
        }  
    }

    const getAll = (req, res) => {
        app.services.version.getAll()
            .then(versions => res.render('version/liste', {
                title: 'Livraisons - liste',
                livraisons: versions
            }));
    };

    const create = (req, res) => {
        app.services.version.create(req.body)
            .then(livraison => res.redirect(`/version`))
            .catch(erreur => res.render('erreur', {
                title: 'Erreur - création',
                erreur
            }));
    };

    return {
        createForm,
        get,
        getAll,
        modify,
        create
    }
}