/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

const path = require('path');

module.exports = {
    entry: './src/main.js',
    mode: 'production',
    target: 'node',
    output: {
        filename: 'rbapi.js',
        path: path.resolve(__dirname, 'lib')
    }
};
