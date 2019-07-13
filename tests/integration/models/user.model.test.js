/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const api = require('../../../src/services/robinhood.services');
const credentials = require('../../../test-credentials.config');
const User = require('../../../src/models/user.model');


describe('UserModel', () => {
    before(async () => {
        await api.authenticate.login(credentials);
    });

    const user = new User();

    describe('updateFromAccountGet', () => {
        it('should be set with defined basic fields', async () => {
            await user.updateFromAccountGet();

            assert.isString(user.account.url);
            assert.isNumber(user.account.cash);
            assert.isNumber(user.account.buyingPower);
            assert.isNumber(user.account.cashAvailableForWithdrawl);
            assert.isNumber(user.account.cashHeldForOrders);
        });
    });

    describe('updateFromAccountProfile', () => {
        it('should be set with defined basic fields', async () => {
            await user.updateFromAccountGet();

            assert.isNumber(user.account.equity);
        });
    });
});
