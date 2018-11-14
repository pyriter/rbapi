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

    let rb =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword'
    });

    console.log(rb);
})();

```

Getting a stock quote

```js

const rbapi = require('rbapi');

(async function() {

    let rb =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword'
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

    let rb =  await rbapi.create({
        username: 'username@email.com',
        password: 'mypassword'
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
