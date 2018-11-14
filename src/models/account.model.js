/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

"use strict"
const User = require("./user.model");

const Account = (function() {
    function Account() {
        this.user = new User();
    }

    Account.prototype.readFromUserEndpoint = function(response) {
        this.user.readFromUserEndpoint(response);
    };

    return Account;
})();

module.exports = Account;


