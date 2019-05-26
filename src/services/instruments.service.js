/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const connect = require('../connection/connect');
const config = require('../config.json');

/*
return
{
    "margin_initial_ratio": "0.5000",
    "rhs_tradability": "tradable",
    "id": "450dfc6d-5510-4d40-abfb-f633b7d9be3e",
    "market": "https://api.robinhood.com/markets/XNAS/",
    "simple_name": "Apple",
    "min_tick_size": null,
    "maintenance_ratio": "0.2500",
    "tradability": "tradable",
    "state": "active",
    "type": "stock",
    "tradeable": true,
    "fundamentals": "https://api.robinhood.com/fundamentals/AAPL/",
    "quote": "https://api.robinhood.com/quotes/AAPL/",
    "symbol": "AAPL",
    "day_trade_ratio": "0.2500",
    "name": "Apple Inc. Common Stock",
    "tradable_chain_id": "cee01a93-626e-4ee6-9b04-60e2fd1392d1",
    "splits": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/splits/",
    "url": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
    "country": "US",
    "bloomberg_unique": "EQ0010169500001000",
    "list_date": "1990-01-02"
}
*/
async function bySymbol(options) {
    if (!options) throw new Error('Options');
    if (!options.stockSymbol) {
        throw new Error('stockSymbol');
    }
    let response = await connect.get({
        url: config.endpoints.instruments,
        params: {
            symbol: options.stockSymbol
        },
    });
    if (response.results && response.results.length > 0) return response.results[0];
    throw new Error(`No instrument for symbol ${options.stockSymbol}`);
}

module.exports = {
    bySymbol
};
