/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../connection/connect');
const querystring = require('querystring');
const defaultConfig = require('../config');

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

async function login(config) {
    if (!config.username || !config.password || !config.deviceToken) {
        throw new TypeError('config must have username, password and deviceToken fields defined');
    }

    if (config.username === accessInfo.username && config.password === accessInfo.password) return accessInfo;
    accessInfo.clearCache();

    let data = querystring.stringify({
        username: config.username,
        password: config.password,
        device_token: config.deviceToken,
        grant_type: defaultConfig.grantType,
        client_id: defaultConfig.clientId
    });

    let response = await connect.post({
        url: defaultConfig.endpoints.authenticate,
        data: data,
    });

    accessInfo.username = config.username;
    accessInfo.password = config.password;
    accessInfo.accessToken = response.access_token;
    accessInfo.refreshToken = response.refresh_token;

    return accessInfo;
}

module.exports = {
    accessInfo,
    login
};
