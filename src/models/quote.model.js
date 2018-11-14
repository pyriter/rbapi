/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const Quote = (function () {
    function Quote() {

    }

    Quote.prototype.initializeFromQuotes = function(data) {
        if(!data) throw new TypeError('data');

        this.askPrice = data.ask_price;
        this.askSize = data.ask_size;
        this.bidPrice = data.bid_price;
        this.bidSize = data.bid_size;
        this.lastTradePrice = data.last_trade_price;
        this.lastExtendedHoursTradePrice = data.last_extended_hours_trade_price;
        this.previousClose = data.previous_close;
        this.adjustedPreviousClose = data.adjusted_previous_close;
        this.previousCloseDate = data.previous_close_date;
        this.symbol = data.symbol;
    };

    return Quote;
})();

module.exports = Quote;
