## rbapi

A nodejs library for trading stocks on Robinhood.

This library strives for ease of use. The calls to Robinhood's api have been abstracted so you only need to care about the stock symbol, the price and the quantity. 

## Features

 - Get user and account information  
 - Get stock quote
 - Place a buy order
 - Place a sell order
 - Automatically renew the access token so you only have to login once
  
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

    // Place a limit order
    let limitBuy = await robinhood.buy({
        orderType: rbapi.OrderType.LIMIT,
        stockSymbol: 'AAPL',
        quantity: 1,
        price: 1.00
    });

    console.log(limitBuy);
    
    // Place a market order
    let marketBuy = await robinhood.buy({
        orderType: rbapi.OrderType.MARKET,
        stockSymbol: 'AAPL',
        quantity: 1
    });

    console.log(marketBuy);
    
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

    // Place a limit order to sell a stock
    let limitSell = await robinhood.sell({
        orderType: rbapi.OrderType.LIMIT,
        stockSymbol: 'AAPL',
        quantity: 1,
        price: 1.00
    });

    console.log(limitSell);
    
     // Place a market order to sell a stock
    let marketSell = await robinhood.sell({
        orderType: rbapi.OrderType.MARKET,
        stockSymbol: 'AAPL',
        quantity: 1
    });
   
    console.log(marketSell);
    
})();
```

Orders

```js

(async () => {
     // Get a list of orders
    let orders = await robinhood.api.orders.recent();
    console.log(orders);
    
    // Get specific information about an order given an id
    let orderId = orders[0].id; 
    let order = await robinhood.api.orders.get({
        id: orderId
    });
    console.log(order);
    
    // Cancel an order
    let result = await robinhood.api.orders.cancel({
        id: orderId
    })
    console.log(result);
    
})();
```

## License

MIT

## Development

If you are going to do fork this library and add to it you can do so by following these steps

```bash
git clone git@github.com:pyriter/rbapi.git
cd rbapi
npm install
touch test-credentials.config.json
vim test-credentials.config.json #Add your robinhood credentials
npm run test

#Once you are done and are ready to publish
npm version [major|minor|patch]
npm publish
```
