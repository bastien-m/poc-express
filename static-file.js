const express = require('express');
const path = require('path');

/**
 * Ce module contient les fichiers
 * a servir statiquement (js/css/img)
 */
module.exports = (app) => {
    app.use('/public', express.static(
        path.join(__dirname, 'public')
    ));

    app.use('/moment', express.static(
        path.join(
            __dirname,
            'node_modules',
            'moment',
            'min',
            'moment.min.js'
        )
    ))

    app.use('/materialize-css', express.static(
        path.join(
                __dirname,
                'node_modules',
                'materialize-css',
                'dist',
                'css',
                'materialize.min.css'
            )
        )
    );

    app.use('/materialize-js', express.static(
        path.join(
                __dirname,
                'node_modules',
                'materialize-css',
                'dist',
                'js',
                'materialize.min.js'
            )
        )
    );
}