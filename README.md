# rbapi

A nodejs library for trading stocks on Robinhood


## Installing

Using npm:

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
            3. Log out if you logged in
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

Getting a stock quote

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

Buying stock 

```js

const rbapi = require('rbapi');

(async function() {

    let robinhood =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword',
        deviceToken: 'my-unique-device-token'
    });


    let stockSymbol = 'AAPL';

    let buy = await robinhood.buy({
        stockSymbol: stockSymbol,
        quantity: 1,
        orderType: Robinhood.OrderType.LIMIT,
        price: 1.00
    });

    console.log(buy);
})();

```

## License

MIT
