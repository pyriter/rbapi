/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const http = require('../connection/http');
const configuration = require('../config');
const authenticationService = require('./authentication.service');

async function requestSuccessInterceptor(config) {
    if (config.url !== configuration.endpoints.authenticate && config.authorization) {
        // It should login if the accessToken is null
        if (!authenticationService.accessInfo.accessToken) {
            try {
                await authenticationService.login(authenticationService.accessInfo.username, authenticationService.accessInfo.password);
            } catch (error) {
                console.error(`Failed to login with username: ${authenticationService.accessInfo.username}`)
                return Promise.reject(error);
            }
        }
        // TODO: Check that the token is about to expire and do a login call with the refresh token

        config.headers['Authorization'] = `Bearer ${authenticationService.accessInfo.accessToken}`;
    }
    return config;
}

http.interceptors.request.use(requestSuccessInterceptor);

function responseSuccessInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authenticationService.accessInfo.accessToken = response.data.access_token;
        authenticationService.accessInfo.expirationDate = new Date(Date.now() + response.data.expires_in);
        authenticationService.accessInfo.refreshToken = response.data.refresh_token;
    }
    return response;
}

function responseErrorInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authenticationService.accessInfo.clearCache();
    }
    return Promise.reject(response);
}

http.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
