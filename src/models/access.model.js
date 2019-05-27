/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';
const Access = (function () {

    function Access() {
        let expiration = null;
        let expirationThreshold;
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
                    expirationThreshold = new Date(expiration);
                    expirationThreshold.setSeconds(-1 * (newValue - newValue * .75));
                }
            }
        });

        Object.defineProperty(this, 'expirationThreshold', {
            get: () => expirationThreshold
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

    Access.prototype.isTokenStillValid = function () {
        return Date.now() < this.expirationThreshold;
    };

    return Access;
})();

module.exports = Access;
