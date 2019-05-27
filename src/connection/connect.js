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
        let response = await http(config);
        return response.data;
    } catch (error) {
        let message = `Failed to ${config.method} ${config.url}. ${error}.`;
        console.error(message);
        if(error && error.response && error.response.data)
            console.error(`Response from server ${JSON.stringify(error.response.data)}`);
        return Promise.reject(error);
    }
}

module.exports = {
    get,
    post
};
