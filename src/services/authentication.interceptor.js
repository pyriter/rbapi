/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const http = require('../connection/http');
const configuration = require('../config');
const authenticationService = require('./authentication.service');

async function requestSuccessInterceptor(config) {
    if (config.url !== configuration.endpoints.authenticate) {

        // Refresh the access token if it is about to expire
        if (authenticationService.access.accessToken && !authenticationService.access.isTokenStillValid()) {
            await authenticationService.refreshAccessToken();
        }

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
