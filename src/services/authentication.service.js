/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../modules/connection/connect');
const config = require('../config.json');
const querystring = require('querystring');

async function login(username, password) {
    if (!username) {
        throw new Error('username');
    }
    if (!password) {
        throw new Error('password');
    }
    let data = querystring.stringify({
        grant_type: config.grant_type,
        client_id: config.client_id,
        username: username,
        password: password
    });
    return await connect.post({
        url: config.endpoints.authenticate,
        data: data,
    });
}

module.exports = {login};
