/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
"use strict";
const assert = require('chai').assert;
const api = require("../../../src/services/robinhood.services");

const stock = "AAPL";

describe('Instruments', () => {
    describe('bySymbol', () => {
        it('should return information about a valid stock instrument', async () => {
            // arrange
            let expectedSymbol = stock;

            // act
            let sut = await api.instruments.bySymbol({stockSymbol: stock});

            // assert
            assert.isDefined(sut);
            assert.equal(sut.symbol, expectedSymbol);
            assert.isDefined(sut.id);
            assert.isDefined(sut.name);
            assert.isDefined(sut.simple_name);
        });
    });
});
