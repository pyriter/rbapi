## rbapi

A nodejs library for trading stocks on Robinhood.

This library strives for ease of use. At the moment you can only buy and sell stocks on your Robinhood account. The calls to Robinhood's api have been abstracted so you only need to care about the stock symbol, the price and the quantity. Just keeping things simple =). The library will create a robinhood instance that holds the user and account information

## Installing

Using Npm:

```bash
$ npm install rbapi --save
```
## Example

Initialize

```js

const rbapi = require('rbapi');

(async function() {

    /*
        You will need to provide the username and password.
        The deviceToken is a bit difficult to get but here's how you do that:
            1. Open the chrome browser
            2. Go to robinhood.com
            3. Log out if you are already logged in to robinhood
            4. Open up the developer tool
            5. Navigate to the Network tab
            6. Click on the clear icon to clear the network history
            7. Log in to your robinhood account
            8. In the filter box type in oauth
            9. Look for the POST method in the list for /oauth2/
            10. You will find the deviceToken in the request payload
     */
    let robinhood =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword',
        deviceToken: 'my-unique-device-token'
    });

    console.log(robinhood);
})();

```

Getting A Stock Quote

```js

const rbapi = require('rbapi');

(async function() {

    let robinhood =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword',
        deviceToken: 'my-unique-device-token'
    });

    let stockSymbol = 'AAPL';

    let quote = await robinhood.quote(stockSymbol);

    console.log(quote);
})();

```

Buying Stock 

```js

const rbapi = require('rbapi');

(async function() {

    let robinhood =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword',
        deviceToken: 'my-unique-device-token'
    });

    let buy = await robinhood.buy({
        orderType: rbapi.OrderType.LIMIT,
        stockSymbol: 'AAPL',
        quantity: 1,
        price: 1.00
    });

    console.log(buy);
})();

```

Selling Stock 

```js

const rbapi = require('rbapi');

(async function() {

    let robinhood =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword',
        deviceToken: 'my-unique-device-token'
    });

    let sell = await robinhood.sell({
        orderType: rbapi.OrderType.LIMIT,
        stockSymbol: 'AAPL',
        quantity: 1,
        price: 1.00
    });

    console.log(sell);
})();
```

## License

MIT
