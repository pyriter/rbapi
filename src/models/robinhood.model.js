/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const robinhoodServices = require('../services/robinhood.services');
const _ = require('lodash');
const User = require('./user.model');
const Quote = require('./quote.model');

const TradeType = Object.freeze({
    BUY: 'buy',
    SELL: 'sell',
    toString: () => 'TradeType'
});

const OrderType = Object.freeze({
    LIMIT: 'limit',
    MARKET: 'market',
    STOPLOSS: 'stop_loss',
    STOPLIMIT: 'stop_limit',
    toString: () => 'OrderType'
});

function validateEnum(val, Enum) {
    if (!Object.values(Enum).includes(val)) throw new TypeError(`${val} is not a valid property of ${Enum.toString()}`);
}

const RobinHood = (function () {

    function RobinHood(credentials) {
        this.credentials = credentials;
        this.api = robinhoodServices;
    }

    RobinHood.prototype.login = async function () {
        try {
            await robinhoodServices.authenticate.login(this.credentials);
        } catch (error) {
            let message = `Failed to authenticate. Please check username and password. ${error}`;
            console.error(message);
            return Promise.reject(new Error(message));
        }
    };

    RobinHood.prototype.initialize = async function () {
        if (this.user) return; // The user object has been created so don't proceed

        this.user = new User();
        await this.user.update();
    };

    RobinHood.prototype.quote = async function (stockSymbol) {
        if (stockSymbol && !stockSymbol.length) throw new TypeError('stockSymbol');
        let response = await robinhoodServices.quotes({stockSymbol});
        let quote = new Quote();
        quote.initializeFromQuotes(response);
        return quote;
    };

    /*
    options: {
        stockSymbol: string,
        quantity: number,
        type: OrderType,
        price?: number,
    }
    e.g.
    {
        stockSymbol: string,
        price?: number,
        quantity: number,
        orderType: OrderType,
    }
    */
    RobinHood.prototype.buy = async function (options) {
        if (!options) throw new TypeError('options');

        if (!_.isString(options.stockSymbol)) throw new TypeError('stockSymbol');
        if (!_.isNumber(options.quantity)) throw new TypeError('numberOfShares');

        validateEnum(options.orderType, OrderType);

        let instrument = await robinhoodServices.instruments.bySymbol({stockSymbol: options.stockSymbol});

        return await robinhoodServices.orders.place({
            data: {
                symbol: options.stockSymbol,
                price: options.price,
                quantity: options.quantity,
                type: options.orderType,
                side: TradeType.BUY,
                trigger: "immediate", // TODO: Provide as options
                time_in_force: "gfd", // TODO: Provide as an option
                account: this.user.account.url,
                instrument: instrument.url
            }
        });
    };

    RobinHood.prototype.sell = async function (options) {
        if (!options) throw new TypeError('options');

        if (!_.isString(options.stockSymbol)) throw new TypeError('stockSymbol');
        if (!_.isNumber(options.quantity)) throw new TypeError('numberOfShares');

        validateEnum(options.orderType, OrderType);

        let instrument = await robinhoodServices.instruments.bySymbol({stockSymbol: options.stockSymbol});

        return await robinhoodServices.orders.place({
            data: {
                symbol: options.stockSymbol,
                price: options.price,
                quantity: options.quantity,
                type: options.orderType,
                side: TradeType.SELL,
                trigger: "immediate", // TODO: Provide as options
                time_in_force: "gfd", // TODO: Provide as an option
                account: this.user.account.url,
                instrument: instrument.url
            }
        });
    };

    RobinHood.prototype.cancelOrder = async function (orderId) {
        if (!orderId || orderId.length === 0 || typeof orderId !== 'string')
            throw new TypeError('orderId must be a defined string');

        return await robinhoodServices.orders.cancel({
            id: orderId
        })
    };

    RobinHood.prototype.getOrder = async function (orderId) {
        return await robinhoodServices.orders.get({
            id: orderId
        });
    };

    return RobinHood;
})();

async function create(credentials) {
    let robinhood = new RobinHood(credentials);
    await robinhood.login();
    await robinhood.initialize();
    return robinhood;
}

module.exports = {
    create,
    OrderType,
    TradeType
};
