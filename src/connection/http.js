/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

'use strict';

const axios = require('axios');
const config = require('../config');

const http = axios.create({
    baseURL: config.hostname
});

module.exports = http;
