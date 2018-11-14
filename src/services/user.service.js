/**
 * Copyright © 2018 by Pyriter
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

'use strict';
const connect = require('../modules/connection/connect');
const config = require('../config.json');

const userConfig = {
    authorization: true
};

/*
return {
    "username": string,
    "first_name": string,
    "last_name": string,
    "id_info": string,
    "url": string,
    "email_verified": boolean,
    "created_at": string,
    "basic_info": string,
    "email": string,
    "investment_profile": string,
    "id": string,
    "international_info": string,
    "employment": string,
    "additional_info": string
}
 */
async function get() {
    return await connect.get({
        url: config.endpoints.user.default,
        ...userConfig
    });
}

/*
return {
    "phone_number": string,
    "city": string,
    "number_dependents": number,
    "citizenship": string,
    "updated_at": string,
    "marital_status": string,
    "zipcode": string",
    "country_of_residence": string,
    "state": string,
    "date_of_birth": string,
    "user": string,
    "signup_as_rhs": boolean,
    "address": string,
    "tax_id_ssn": string
}
 */
async function getBasicInfo() {
    return await connect.get({
        url: config.endpoints.user.basicInfo,
        ...userConfig
    });
}

/*
return {
  "interested_in_options": boolean,
  "annual_income": string,
  "investment_experience": string,
  "updated_at": string,
  "option_trading_experience": string,
  "understand_option_spreads": boolean,
  "risk_tolerance": string,
  "total_net_worth": string,
  "liquidity_needs": string,
  "investment_objective": string,
  "source_of_funds": string,
  "user": string,
  "suitability_verified": boolean,
  "professional_trader": boolean,
  "tax_bracket": string,
  "time_horizon": string,
  "liquid_net_worth": string,
  "investment_experience_collected": boolean
}
 */
async function getInvestmentProfile() {
    return await connect.get({
        url: config.endpoints.user.investmentProfile,
        ...userConfig
    });
}

/*
return {
    "employer_zipcode": string,
    "employment_status": string,
    "employer_address": string,
    "updated_at": string,
    "employer_name": string,
    "user": string,
    "years_employed": number,
    "employer_state": string,
    "employer_city": string,
    "occupation": string
}
 */
async function getEmployment() {
    return await connect.get({
        url: config.endpoints.user.employment,
        ...userConfig
    });
}

/*
return {
    "security_affiliated_firm_relationship": string,
    "security_affiliated_employee": boolean,
    "agreed_to_rhs_margin": boolean,
    "security_affiliated_address": string,
    "object_to_disclosure": boolean,
    "updated_at": boolean,
    "control_person": boolean,
    "stock_loan_consent_status": string,
    "agreed_to_rhs": boolean,
    "sweep_consent": boolean,
    "user": string,
    "control_person_security_symbol": string,
    "security_affiliated_firm_name": string,
    "security_affiliated_person_name": string
}
 */
async function getAdditionalInfo() {
    return await connect.get({
        url: config.endpoints.user.additionalInfo,
        ...userConfig
    });
}

module.exports = {
    get,
    getBasicInfo,
    getInvestmentProfile,
    getEmployment,
    getAdditionalInfo
};