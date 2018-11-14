/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../modules/connection/connect');
const config = require('../config.json');

/*
return {
  "ask_price": "203.850000",
  "ask_size": 1900,
  "bid_price": "203.760000",
  "bid_size": 4800,
  "last_trade_price": "203.770000",
  "last_extended_hours_trade_price": "203.800000",
  "previous_close": "201.590000",
  "adjusted_previous_close": "201.590000",
  "previous_close_date": "2018-11-05",
  "symbol": "AAPL",
  "trading_halted": false,
  "has_traded": true,
  "last_trade_price_source": "consolidated",
  "updated_at": "2018-11-07T00:59:57Z",
  "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/"
}
 */
async function quotes(options) {
    if (!options) throw new TypeError('Options');
    if (!options.stockSymbol) {
        throw new TypeError('stockSymbol');
    }
    return await connect.get({
        url: `${config.endpoints.quotes}${options.stockSymbol}/`,
        ...options
    });
}

module.exports = quotes;
