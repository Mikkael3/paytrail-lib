# Node, typescript - paytrail-lib

This module allows you to create payments with Paytrail REST-api https://docs.paytrail.com/en/ch04s05.html.

# Usage

installation:

```bash
npm i paytrail-lib
```

Example usage to create payment with price:

```Js
const PaytrailLib = require("paytrail-lib");

const paytrail = new PaytrailLib(
  "13466",
  "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ",
  {
    success: "https://www.domain.com",
    failure: "https://www.domain.com",
    notification: "https://www.domain.com"
  }
);
const paymentWithPrice = {
  orderNumber: "12345678",
  price: 499999.99
};
paytrail.createPayment(paymentWithPrice).then(({orderNumber, token, url}) => {
  console.log(orderNumber, token, url);
  }
).catch(error => {console.log(error.message)});
```

# Documentation

### constructor

| param          | value                                                       |
| -------------- | ----------------------------------------------------------- |
| merchantId     | string!                                                     |
| merchantSecret | string!                                                     |
| urlSet         | {success: string!, notification: string!, failure: string!} |

```js
const PaytrailLib = require("paytrail-lib");

const paytrail = new PaytrailLib("13466", "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ", {
  success: "https://www.domain.com",
  failure: "https://www.domain.com",
  notification: "https://www.domain.com"
});
```

### createPayment : Promise | never

| param           | value                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orderNumber     | string!                                                                                                                                                                                                                                                                                                                                                                  |
| referenceNumber | string? (READ doc: https://docs.paytrail.com/en/ch04s05.html)                                                                                                                                                                                                                                                                                                            |
| description     | string?                                                                                                                                                                                                                                                                                                                                                                  |
| currency        | string? (default: EUR)                                                                                                                                                                                                                                                                                                                                                   |
| locale          | string? (default: fi_FI)                                                                                                                                                                                                                                                                                                                                                 |
| orderDetails    | {invludeVat: boolean!, products[]: [{title: string!, code: string?, amount: number, price: number, vat: number, discount:number?, type?: (number, default 1) }]!,contact:{firstName:string, lastName: string, companyName: string?, email: string, telephone: string?, mobile: string?, {address: {street: string!, postalCode!, postalOffice!, country: string!}!}}!}?; |
| price           | number? (Note: you only can have price if you dont have orderDetails)                                                                                                                                                                                                                                                                                                    |

```js
const paymentWithPrice = {
  orderNumber: "12345678",
  price: 499999.99
};
try {
  const { url, token, orderNumber } = await paytrail.createPayment(
    paymentWithPrice
  );
} catch {
  //
}

const paymentWithOrderDetails = {
  orderNumber: "12345678",
  description: "Cat",
  currency: "EUR",
  locale: "fi_FI",
  orderDetails: {
    includeVat: true,
    contact: {
      firstName: "Cat",
      lastName: "Cat",
      companyName: "Cat Oy",
      email: "cat@cat.com",
      telephone: "04123123123",
      mobile: "040404040440",
      address: {
        street: "Cat 1",
        postalCode: "123123",
        postalOffice: "CAt",
        country: "FI"
      }
    },
    products: [
      {
        title: "Cat",
        code: "Cat",
        amount: 100000,
        price: 0.78,
        vat: 23,
        discount: 0,
        type: 1
      }
    ]
  }
};
try {
  const { url: url2, token: token2, orderNumber: orderNumber2 } = await paytrail.createPayment(
    paymentWithOrderDetails
  );
} catch {
  //
}
```

### confirmPayment: boolean

| param | value                                                                                         |
| ----- | --------------------------------------------------------------------------------------------- |
| query | {orderNumber: string!, timestamp: string!, paid: string?, method: number?, authCode: string!} |

```js
paytrail.confirmPayment({
  orderNumber: "ORDER-12345",
  payment: "12345678012",
  timestamp: "1212121212",
  paid: "asdfasdfas",
  method: 1,
  authCode: "3E7E4970AFF62A44145B5A71841FBC74"
});
```

### confirmPaymentFromQuery : boolean

| param | value                                                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------- |
| query | {ORDER_NUMBER: string!, TIMESTAMP: string!, PAID: string?, METHOD: number?, RETURN_AUTHCODE: string!} |

```js
// koa and koa-router example
router.get("/return-path", ctx => {
  const result = paytrail.confirmPaymentFromQuery(ctx.query);
  ctx.body = `Payment confirmation: ${result} `;
});
```
