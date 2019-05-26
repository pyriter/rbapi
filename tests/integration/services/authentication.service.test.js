/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const api = require('../../../src/services/robinhood.services');
const credentials = require('../../../test-credentials.config');

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
});
