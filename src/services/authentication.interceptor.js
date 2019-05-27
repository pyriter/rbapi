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
        if (!authenticationService.access.accessToken) {
            try {
                await authenticationService.login(authenticationService.access.username, authenticationService.access.password);
            } catch (error) {
                console.error(`Failed to login with username: ${authenticationService.access.username}`);
                return Promise.reject(error);
            }
        }
        // TODO: Check that the token is about to expire and do a login call with the refresh token

        config.headers['Authorization'] = `Bearer ${authenticationService.access.accessToken}`;
    }
    return config;
}

http.interceptors.request.use(requestSuccessInterceptor);

function responseSuccessInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authenticationService.access.accessToken = response.data.access_token;
        authenticationService.access.expiration = response.data.expires_in;
        authenticationService.access.refreshToken = response.data.refresh_token;
    }
    return response;
}

function responseErrorInterceptor(response) {
    if (response.request.path === configuration.endpoints.authenticate) {
        authenticationService.access.clear();
    }
    return Promise.reject(response);
}

http.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
