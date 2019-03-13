const ApplicationError = require('../models/application.error');
const moment = require('moment');

const livraisons = [
    {
        id: 0,
        tag: 'v0',
        createur: 'bastien',
        date_deploiement: moment('2019-01-01', 'yyyy-MM-dd').format('YYYY-MM-DD')
    },
    {
        id: 1,
        tag: 'v1',
        createur: 'sylvain',
        date_deploiement: moment('2019-01-01', 'yyyy-MM-dd').format('YYYY-MM-DD')
    }
];

module.exports = (app) => {

    const get = (id) => {
        return new Promise((resolve, reject) => {
            const livraison = livraisons.find(l => l.id === +id );
            if (livraison) {
                return resolve(livraison);
            } else {
                
                return reject(new ApplicationError(404, 'Aucune livraison trouvée'))
            }
        })
    };

    const getAll = () => {
        return Promise.resolve(livraisons);
    };

    const update = (livraison) => {
        return new Promise((resolve, reject) => {
            const index = livraisons.findIndex(l => l.id === +livraison.id);
            if (index === -1) {
                return reject(new ApplicationError(400, 'Livraison introuvable'))
            } else {
                const livraisonAModifier = livraisons[index];
                livraisonAModifier.createur = livraison.createur;
                livraisonAModifier.date_deploiement = livraison.date_deploiement;
                livraisonAModifier.tag = livraison.tag;
                return resolve(livraison);
            }
        })
    }

    const create = (livraison) => {
        return new Promise((resolve, reject) => {
            if (livraisons.find(l => livraison.tag === l.tag)) {
                return reject(new ApplicationError(503, 'Tag existant'));
            }
            livraison.id = +livraisons.reduce((previous, current) => current.id > previous ? current.id : previous , 0) + 1;
            livraisons.push(livraison);
            return resolve(livraison);
        })
        
    };

    return {
        get,
        getAll,
        update,
        create
    }

}
