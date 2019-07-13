/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

'use strict';
const robinhoodServices = require('../services/robinhood.services');

const User = (function () {

    function User() {
    }

    User.prototype.update = async function () {
        return Promise.all([
            this.updateFromUserGet(),
            this.updateFromUserBasicInfo(),
            this.updateFromAccountGet()
        ]);
    };

    User.prototype.updateFromUserGet = async function () {
        let data = await robinhoodServices.user.get();
        if (!data) throw new TypeError('data');
        this.username = data.username;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.createdAt = data.created_at;
        this.email = data.email;
        this.id = data.id;
    };

    User.prototype.updateFromUserBasicInfo = async function () {
        let data = await robinhoodServices.user.getBasicInfo();
        if (!data) throw new TypeError('data');

        this.phoneNumber = data.phone_number;
        this.city = data.city;
        this.numberDependents = data.number_dependents;
        this.citizenship = data.citizenship;
        this.updatedAt = data.updated_at;
        this.martialStatus = data.marital_status;
        this.zipcode = data.zipcode;
        this.countryOfResidence = data.country_of_residence;
        this.state = data.state;
        this.dateOfBirth = data.date_of_birth;
        this.address = data.address;
        this.taxIdSsn = data.tax_id_ssn;
    };

    User.prototype.updateFromAccountGet = async function () {
        let data = await robinhoodServices.accounts.get();
        if (!data) throw new TypeError('data');
        let account = {
            ...this.account,
            id: data.account_number,
            url: data.url,
            cash: Number.parseFloat(data.cash),
            buyingPower: Number.parseFloat(data.buying_power),
            cashAvailableForWithdrawl: Number.parseFloat(data.cash_available_for_withdrawal),
            cashHeldForOrders: Number.parseFloat(data.cash_held_for_orders)
        };
        this.account = account;

        await this.updateFromAccountProfile();
    };

    User.prototype.updateFromAccountProfile = async function () {
        let data = await robinhoodServices.accounts.portfolio({id: this.account.id});
        if (!data) throw new TypeError('data');
        let account = {
            ...this.account,
            marketValue: Number.parseFloat(data.market_value),
            excessMaintenanceWithUnclearedDeposits: Number.parseFloat(data.excess_maintenance_with_uncleared_deposits),
            withDrawableAmount: Number.parseFloat(data.withdrawable_amount),
            excessMaintenance: Number.parseFloat(data.excess_maintenance),
            lastCoreMarketValue: Number.parseFloat(data.last_core_market_value),
            unWithdrawableDeposits: Number.parseFloat(data.unwithdrawable_deposits),
            extendedHoursEquity: Number.parseFloat(data.extended_hours_equity),
            excessMargin: Number.parseFloat(data.excess_margin),
            excessMarginWithUnclearedDeposits: Number.parseFloat(data.excess_margin_with_uncleared_deposits),
            equity: Number.parseFloat(data.equity), // THIS IS WHAT IS SHOWN ON THE ROBINHOOD APP
            lastCoreEquity: Number.parseFloat(data.last_core_equity),
            adjustedEquityPreviousClose: Number.parseFloat(data.adjusted_equity_previous_close),
            equityPreviousClose: Number.parseFloat(data.equity_previous_close),
            startDate: data.start_date,
            extendedHoursMarketValue: Number.parseFloat(data.extended_hours_market_value)
        };
        this.account = account;
    };

    return User;
})();

module.exports = User;
