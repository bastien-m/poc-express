const ApplicationErreur = require('../models/application.error');

module.exports = (app) => {
    const get = (req, res) => {
        const { id, action } = req.params;
        app.services.version.get(id)
            .then(version =>  res.render('version/creer', {
                title: `Livraison ${version.tag}`,
                livraison: version,
                lectureSeule: action === 'afficher' ? true : false
            }))
            .catch(erreur => {res.render('erreur', { title: 'Erreur',erreur })});
        
    };

    const createForm = (req, res) => { res.render('version/creer', {
        title: 'Créer une nouvelle livraison',
        livraison: null,
        lectureSeule: false
    })}

    const modify = (req, res) => {
        const id = req.params.id;
        if (id !== req.body.id) {
            return res.render('erreur', {
                title: 'Erreur - modification',
                erreur: new ApplicationErreur(400, `Tentative de modification d'un élément non autorisé`)
            });
        } else {
            app.service.version.modify(req.body)
                .then(livraison => res.render(`version/creer/${livraison.id}`))
                .catch(erreur => res.render('erreur', {
                    title: 'Erreur - modification',
                    erreur
                }))
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
            .then(livraison => res.render(`version/creer/${livraison.tag}`))
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