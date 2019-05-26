/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../connection/connect');
const querystring = require('querystring');
const config = require('../config');

const accessInfo = {
    username: null,
    password: null,
    accessToken: null,
    expiration: null,
    refreshToken: null,
    clearCache: () => {
        this.username = undefined;
        this.password = undefined;
        this.accessToken = undefined;
        this.expiration = undefined;
        this.refreshToken = undefined;
    }
};

async function login(credentials) {
    if (!credentials.username || !credentials.password || !credentials.deviceToken) {
        throw new TypeError('config must have username, password and deviceToken fields defined');
    }

    if (credentials.username === accessInfo.username && credentials.password === accessInfo.password) return accessInfo;
    accessInfo.clearCache();

    let data = querystring.stringify({
        username: credentials.username,
        password: credentials.password,
        device_token: credentials.deviceToken,
        grant_type: config.grantType,
        client_id: config.clientId
    });

    let response = await connect.post({
        url: config.endpoints.authenticate,
        data: data,
    });

    accessInfo.username = credentials.username;
    accessInfo.password = credentials.password;
    accessInfo.accessToken = response.access_token;
    accessInfo.refreshToken = response.refresh_token;

    return accessInfo;
}

module.exports = {
    accessInfo,
    login
};
