/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */
'use strict';

const assert = require('chai').assert;
const api = require('../../../src/services/robinhood.services');
const config = require('../../../src/config');

describe('User', () => {
    before(async () => {
        await api.authenticate.login(config);
    });

    describe('get', () => {
        it('should return a user object', async () => {
            // arrange

            // act
            let sut = await api.user.get();

            // assert
            assert.isNotNull(sut);
            assert.isDefined(sut.first_name);
            assert.isDefined(sut.last_name);
            assert.isDefined(sut.email);
        });
    });
    describe('getBasicInfo', () => {
        it('should return a user basic info object', async () => {
            // arrange

            // act
            let sut = await api.user.getBasicInfo();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.address);
            assert.isDefined(sut.city);
            assert.isDefined(sut.zipcode);
        });
    });
    describe('getInvestmentProfile', () => {
        it('should return a user\'s investment profile object', async () => {
            // arrange

            // act
            let sut = await api.user.getInvestmentProfile();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.risk_tolerance);
            assert.isDefined(sut.source_of_funds);
        });
    });
    describe('getAdditionalInfo', () => {
        it('should return a user\'s investment profile object', async () => {
            // arrange

            // act
            let sut = await api.user.getAdditionalInfo();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.agreed_to_rhs);
            assert.isDefined(sut.control_person);
        });
    });
    describe('getEmployment', () => {
        it('should return a user\'s investment profile object', async () => {
            // arrange

            // act
            let sut = await api.user.getEmployment();

            // assert
            assert.isDefined(sut);
            assert.isDefined(sut.employer_address);
            assert.isDefined(sut.employer_city);
            assert.isDefined(sut.occupation);
        });
    });
});
