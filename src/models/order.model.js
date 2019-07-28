/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

'use strict';
const robinhoodServices = require('../services/robinhood.services');

const Order = (function () {

    function Order() {

    }

    Order.prototype.get = async function (id) {
        let order = await robinhoodServices.orders.get({id});
        return {
            id: order.id,
            side: order.side,
            price: Number.parseFloat(order.price),
            quantity: Number.parseInt(order.quantity),
            state: order.state,
            type: order.type,
            createdAt: new Date(order.created_at),
            updatedAt: new Date(order.updated_at)
        };
    };

    return Order;
})();

module.exports = Order;
