/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
"use strict";
const assert = require('chai').assert;
const api = require("../../../src/services/robinhood.services");
const config = require("../../../src/config");

describe('Accounts', () => {
    before(async () => {
        await api.authenticate.login(config);
    });


    describe('get', () => {
        it('should return account information', async () => {
            // arrange

            // act
            let sut = await api.accounts.get();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.account_number);
            assert.isDefined(sut.buying_power);
            assert.isDefined(sut.cash);
            assert.isDefined(sut.url);
        });
    });


    describe('portfolio', () => {
        it('should return account portfolio information', async () => {
            // arrange
            let response = await api.accounts.get();

            // act
            let sut = await api.accounts.portfolio({
                id: response.account_number
            });

            // assert
            assert.isDefined(sut);
            assert.isString(sut.equity);
            assert.isString(sut.extended_hours_equity);
        });
    });
});
