/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../connection/connect');
const querystring = require('querystring');
const config = require('../config');
const Access = require('../models/access.model');

const GrantType = Object.freeze({
    PASSWORD: 'password',
    REFRESH_TOKEN: 'refresh_token',
    toString: () => 'GrantType'
});

const access = new Access();

async function login(credentials) {
    if (!credentials.username || !credentials.password || !credentials.deviceToken) {
        throw new TypeError('config must have username, password and deviceToken fields defined');
    }

    if (credentials.username === access.username && credentials.password === access.password) return access;
    access.clear();

    let data = querystring.stringify({
        username: credentials.username,
        password: credentials.password,
        device_token: credentials.deviceToken,
        grant_type: GrantType.PASSWORD,
        client_id: config.clientId
    });

    let response = await connect.post({
        url: config.endpoints.authenticate,
        data: data
    });

    access.username = credentials.username;
    access.password = credentials.password;
    access.accessToken = response.access_token;
    access.refreshToken = response.refresh_token;

    return access;
}

async function refreshAccessToken() {
    if (!access.refreshToken) {
        throw new TypeError('Refresh token not set. Unable to refresh access token');
    }

    let data = querystring.stringify({
        grant_type: GrantType.REFRESH_TOKEN,
        refresh_token: access.refreshToken,
        client_id: config.clientId
    });

    try {
        let response = await connect.post({
            url: config.endpoints.authenticate,
            data: data,
        });

        access.accessToken = response.access_token;
        access.refreshToken = response.refresh_token;
        access.expiration = response.expires_in;

        return access;

    } catch (exception) {
        access.clear();
        throw new Error('Unable to refresh the access token with the one stored')
    }
}

module.exports = {
    access,
    login,
    refreshAccessToken
};
