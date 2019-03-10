const ApplicationError = require('../models/application.error');

const livraisons = [
    {
        id: 0,
        tag: 'v0',
        createur: 'bastien',
        date_deploiement: '01/01/2019'
    },
    {
        id: 1,
        tag: 'v1',
        createur: 'sylvain',
        date_deploiement: '01/03/2019'
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
            const index = livraisons.findIndex(l => l.id === livraison.id);
            if (index === -1) {
                return reject(new ApplicationError(400, 'Livraison introuvable'))
            } else {
                livraisons[index] = livraison;
                return resolve(livraison);
            }
        })
    }

    const create = (livraison) => {
        return new Promise((resolve, reject) => {
            if (livraisons.find(l => livraison.tag === l.tag)) {
                return reject(new ApplicationError(503, 'Tag existant'));
            }
            livraison.id = +livraisons.reduce((previous, current) => current.id > previous ? current : previous , 0) + 1;
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
