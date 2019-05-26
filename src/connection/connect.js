/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const http = require('./http');

const RestMethod = Object.freeze({
    GET: 'get',
    POST: 'post'
});

async function get(config) {
    config = config || {};
    config.method = RestMethod.GET;
    return await connect(config);
}

async function post(config) {
    config = config || {};
    config.method = RestMethod.POST;
    return await connect(config);
}

async function connect(config) {
    try {
        config = config || {};
        /*
        config.headers = {
            'Accept': '*
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
            'Connection': 'keep-alive',
            'X-Robinhood-API-Version': '1.152.0',
            'User-Agent': 'Robinhood/5.32.0 (com.robinhood.release.Robinhood; build:3814; iOS 10.3.3)'
        };
        */
        let response = await http(config);
        return response.data;
    } catch (error) {
        let message = `Failed to ${config.method} ${config.url}. ${error}`;
        console.error(message);
        return Promise.reject(error);
    }
}

module.exports = {
    get,
    post
};
