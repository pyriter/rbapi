/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const api = require('../../../src/services/robinhood.services');
const credentials = require('../../../test-credentials.config');
const OrderModel = require('../../../src/models/order.model');

describe('OrderModel', () => {
    before(async () => {
        await api.authenticate.login(credentials);
    });

    const orderModel = new OrderModel();

    describe('get', () => {
        it('should get the order with the fields converted', async () => {
            let response = await api.orders.recent();
            /*
            let states = [];
            for(let i = 0; i < response.results.length; i++) {
                states.push(response.results[i].state)
            }
             */
            let id = response.results[0].id;

            let order = await orderModel.get(id);

            assert.isString(order.id);
            assert.isString(order.side);
            assert.isNumber(order.price);
            assert.isNumber(order.quantity);
            assert.isString(order.state);
            assert.isString(order.type);
            assert.isDefined(order.createdAt);
            assert.isDefined(order.updatedAt);
        });
    });
});
