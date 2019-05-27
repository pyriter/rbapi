/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';
const Access = (function () {

    function Access() {
        let expiration = null;
        this.username = null;
        this.password = null;
        this.accessToken = null;
        this.refreshToken = null;

        Object.defineProperty(this, 'expiration', {
            get: () => expiration,
            set: (newValue) => {
                if (!newValue) {
                    expiration = newValue;
                } else {
                    expiration = new Date();
                    expiration.setSeconds(expiration.getSeconds() + newValue);
                }
            }
        });

        return this;
    }

    Access.prototype.clear = function () {
        this.username = null;
        this.password = null;
        this.accessToken = null;
        this.expiration = null;
        this.refreshToken = null;
    };

    return Access;
})();

module.exports = Access;
