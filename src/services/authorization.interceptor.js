/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const http = require('../modules/connection/http');
const configuration = require('../config');
const authentication = require('./authentication.service');

var authorization = {
    username: null,
    password: null,
    accessToken: null,
    expiration: null,
    refreshToken: null
};

async function requestSuccessInterceptor(config) {
    if (config.url !== configuration.endpoints.authenticate && config.authorization) {
        // It should login if the accessToken is null
        if (!authorization.accessToken) {
            try {
                await authentication.login(authorization.username, authorization.password);
            } catch (error) {
                console.error(`Failed to login with username: ${authorization.username}`)
                return Promise.reject(error);
            }
        }
        // TODO: Check that the token is about to expire and do a login call with the refresh token

        config.headers['Authorization'] = `Bearer ${authorization.accessToken}`;
    }
    return config;
}

http.interceptors.request.use(requestSuccessInterceptor);

function responseSuccessInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authorization.accessToken = response.data.access_token;
        authorization.expirationDate = new Date(Date.now() + response.data.expires_in);
        authorization.refreshToken = response.data.refresh_token;
    }
    return response;
}

function responseErrorInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authorization.accessToken = null;
        authorization.expirationDate = null;
        authorization.refreshToken = null;
    }
    return Promise.reject(response);
}

http.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

module.exports = {
    authorization
};
