/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
"use strict";

const assert = require("chai").assert;
const api = require("../../../src/services/robinhood.services");
const config = require("../../../src/config");
const interceptor = require("../../../src/services/authorization.interceptor");

describe("Authenticate", () => {
    describe("login", () => {
        it("should return a token when using the username and password from config", async () => {
            // arrange

            // act
            let sut = await api.authenticate.login(config.username, config.password);

            // assert
            assert.isNotNull(sut);
            assert.isNotNull(sut.access_token);
            assert.isTrue(typeof sut.access_token === "string");
            assert.equal(sut.access_token, interceptor.authorization.accessToken);
            assert.equal(sut.refresh_token, interceptor.authorization.refreshToken);
        });

        it("should fail when using an invalid username and password", async () => {
            // arrange
            let expectedCode = 400;

            // act
            try {
                await api.authenticate.login("invalid_username", "invalid_password");
            } catch (error) {
                assert.notEqual(error.message.indexOf(expectedCode), -1);
                assert.isNull(interceptor.authorization.accessToken);
                assert.isNull(interceptor.authorization.refreshToken);
                assert.isNull(interceptor.authorization.expirationDate);
            }
        });
    });
});
