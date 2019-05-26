/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
"use strict";
const assert = require('chai').assert;
const api = require("../../../src/services/robinhood.services");
const config = require('../../../src/config');

const stock = "AAPL";

describe('Quotes', () => {
    before(async () => {
        await api.authenticate.login(config);
    });

    describe('quote', () => {
        it('should return information about a stock', async () => {
            // arrange
            let expectedSymbol = stock;

            // act
            let sut = await api.quotes({stockSymbol: stock});

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.ask_price);
            assert.equal(sut.symbol, expectedSymbol);
        });

        it('should fail when using an invalid stock', async () => {

            // arrange
            let expectedCode = 404;
            let fakeStock = "fakestock";

            // act
            try {
                await api.quotes({stockSymbol: fakeStock});
            } catch (error) {
                // assert
                assert.notEqual(error.message.indexOf(expectedCode), -1);
            }
        });
    });
});
