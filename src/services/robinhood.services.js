/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const accounts = require('./acounts.service');
const authenticate = require('./authentication.service');
const instruments = require('./instruments.service');
const orders = require('./orders.service');
const quotes = require('./quotes.service');
const user = require('./user.service');

// initialization
const interceptor = require('./authorization.interceptor'); //setup the interceptor

module.exports = {
    interceptor,
    authenticate,
    accounts,
    instruments,
    orders,
    quotes,
    user,
};
