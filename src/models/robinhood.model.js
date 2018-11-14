/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const rbApi = require('../services/robinhood.services');
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
        if (!credentials) throw TypeError('credentials');
        if (!_.isString(credentials.username)) throw TypeError('username');
        if (!_.isString(credentials.password)) throw TypeError('password');

        this.credentials = credentials;
    }

    RobinHood.prototype.login = async function () {
        try {
            await rbApi.authenticate.login(this.credentials.username, this.credentials.password);
        } catch (error) {
            let message = `Failed to authenticate. Please check username and password. ${error}`;
            console.error(message);
            return Promise.reject(new Error(message));
        }
    };

    RobinHood.prototype.initialize = async function () {
        if (this.user) return; // The user object has been created so don't proceed

        this.user = await createUser();
    };

    RobinHood.prototype.quote = async function (stockSymbol) {
        if (stockSymbol && !stockSymbol.length) throw new TypeError('stockSymbol');
        let response = await rbApi.quotes({stockSymbol});
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

        let instrument = await rbApi.instruments.bySymbol({stockSymbol: options.stockSymbol});

        return await rbApi.orders.place({
            data: {
                symbol: options.stockSymbol,
                price: options.price,
                quantity: options.quantity,
                side: TradeType.BUY,
                trigger: "immediate", // TODO: Provide as options
                time_in_force: "gfd", // TODO: Provide as an option
                type: options.orderType,
                account: this.user.account.url,
                instrument: instrument.url
            }
        });
    };

    async function createUser() {
        let user = new User();
        user.initializeFromUserGet(await rbApi.user.get());
        user.initializeFromUserBasicInfo(await rbApi.user.getBasicInfo());
        user.initializeFromAccountGet(await rbApi.accounts.get());
        user.initializeFromAccountProfile(await rbApi.accounts.portfolio({id: user.account.id}));
        return user;
    }

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
