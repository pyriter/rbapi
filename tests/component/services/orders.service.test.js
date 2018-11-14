/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const config = require('../../../src/config');
const assert = require('chai').assert;
const api = require('../../../src/services/robinhood.services');

describe('Orders', () => {

    let stockSymbol = 'AAPL';
    let options = {
        data: {
            symbol: stockSymbol,
            price: 1.00,
            quantity: 1,
            side: 'buy',
            trigger: 'immediate',
            time_in_force: 'gfd',
            type: 'limit',
        }
    };

    before(async () => {
        await api.authenticate.login(config.username, config.password);

        let response = await api.instruments.bySymbol({stockSymbol});
        options.data.instrument = response.url;

        response = await api.accounts.get();
        options.data.account = response.url;
    });

    describe('recent', () => {
        it('should return information about a recent orders', async () => {
            // arrange

            // act
            let sut = await api.orders.recent();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.results);
        });
    });

    describe('operations', () => {
        let orderId;

        it('should place an order for a valid stock symbol', async () => {
            // arrange

            // act
            let sut = await api.orders.place(options);

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.cancel); // endpoint to cancel
            assert.isDefined(sut.id);
            assert.equal(sut.price, options.data.price);
            assert.equal(sut.quantity, options.data.quantity);
            orderId = sut.id;
        });

        it('should cancel the previously placed order', async () => {
            // arrange

            // act
            let sut = await api.orders.cancel({
                id: orderId
            });

            // assert
            assert.isDefined(sut);
        });
    });
});
