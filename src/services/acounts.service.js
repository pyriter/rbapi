/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../connection/connect');
const config = require('../config.json');

async function get() {
    let response = await connect.get({
        url: config.endpoints.accounts
    });
    if (response.results && response.results.length > 0) {
        return response.results[0];
    }
    throw new Error('Unable to get account information');
}

/*
return {
  "unwithdrawable_grants": string,
  "account": string,
  "excess_maintenance_with_uncleared_deposits": string,
  "url": string,
  "excess_maintenance": string,
  "market_value": string,
  "withdrawable_amount": string,
  "last_core_market_value": string,
  "unwithdrawable_deposits": string,
  "extended_hours_equity": string,
  "excess_margin": string,
  "excess_margin_with_uncleared_deposits": string,
  "equity": string,
  "last_core_equity": string,
  "adjusted_equity_previous_close": string,
  "equity_previous_close": string,
  "start_date": string,
  "extended_hours_market_value": string
}
 */
async function portfolio(options) {
    if (!options && !options.id) throw new TypeError('id');

    let response = await connect.get({
        url: `${config.endpoints.accounts}${options.id}/portfolio/`,
        authorization: true
    });
    return response;
}

module.exports = {
    get,
    portfolio
};
