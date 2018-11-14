/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../modules/connection/connect');
const config = require('../config.json');

async function recent() {
    return await connect.get({
        url: config.endpoints.orders,
        authorization: true
    });
}

async function place(options) {
    return await connect.post({
        url: config.endpoints.orders,
        authorization: true,
        ...options
    });
}

async function cancel(options) {
    if (!options || !options.id) throw new TypeError('id');
    return await connect.post({
        url: `${config.endpoints.orders}${options.id}/cancel/`,
        authorization: true,
        ...options
    });
}

module.exports = {
    recent,
    place,
    cancel
};
