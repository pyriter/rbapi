/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const api = require('../../../src/services/robinhood.services');
const credentials = require('../../../test-credentials.config');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

describe('Authenticate', () => {
    describe('login', () => {
        it('should return a token when using the username and password from config', async () => {
            // act
            let sut = await api.authenticate.login(credentials);

            // assert
            assert.isNotNull(sut);
            assert.isNotNull(sut.accessToken);
            assert.isTrue(typeof sut.accessToken === 'string');
            assert.isNotNull(sut.refreshToken);
            assert.isTrue(typeof sut.refreshToken === 'string');
            assert.isTrue(credentials.username === sut.username);
            assert.isTrue(credentials.password === sut.password);
        });

        it('should fail when using an invalid username and password', async () => {
            // arrange
            let expectedCode = 400;
            let sut = {};

            // act
            try {
                sut = await api.authenticate.login('invalid_username', 'invalid_password');
            } catch (error) {
                expect(sut.accessToken).to.be.undefined;
                expect(sut.refreshToken).to.be.undefined;
                expect(sut.expirationDate).to.be.undefined;
                expect(sut.username).to.be.undefined;
                expect(sut.password).to.be.undefined;
            }
        });
    });

    describe('refresh the access token', () => {
        it('should refresh the access token using the refresh token and then update the local cache', async () => {
            // arrange

            // act
            await api.authenticate.login(credentials);
            let beforeRefresh = JSON.parse(JSON.stringify(api.authenticate.access));
            beforeRefresh.expiration = api.authenticate.access.expiration.toString();
            await sleep(1000);
            await api.authenticate.refreshAccessToken();
            let afterRefresh = JSON.parse(JSON.stringify(api.authenticate.access));
            afterRefresh.expiration = api.authenticate.access.expiration.toString();

            // assert
            expect(beforeRefresh.accessToken).to.not.equal(afterRefresh.accessToken);
            expect(beforeRefresh.refreshToken).to.not.equal(afterRefresh.refreshToken);
            expect(beforeRefresh.expiration).to.not.equal(afterRefresh.expiration);
        });

        it('should clear the cached access token if the cached refresh token does not authenticate', async () => {
            // arrange
            let access = api.authenticate.access;
            access.refreshToken = 'this-refresh-token-doesnt-work';

            // act
            try {
                await api.authenticate.refreshAccessToken();
            } catch (e) {
                // assert
                expect(access.accessToken).to.be.null;
                expect(access.username).to.be.null;
                expect(access.password).to.be.null;
                expect(access.expiration).to.be.null;
            }
        });
    });
});
