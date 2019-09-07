const PaytrailRest = require("paytrail-lib");

const rest = new PaytrailRest("13466", "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ", {
  success: "https://www.google.com",
  failure: "https://www.google.com",
  notification: "https://www.google.com"
});

const paymentOrderDetails = {
  orderNumber: "12345678",
  description: "Kissalle kamaa",
  currency: "EUR",
  locale: "fi_FI",
  orderDetails: {
    includeVat: true,
    contact: {
      firstName: "Kissa",
      lastName: "Kissanmaa",
      companyName: "Kissala Oy",
      email: "kissa@kissa.com",
      telephone: "040404040440",
      mobile: "040404040440",
      address: {
        street: "Kissakatu 1",
        postalCode: "123123",
        postalOffice: "Tampere",
        country: "FI"
      }
    },
    products: [
      {
        title: "Kissa",
        code: "Kissa",
        amount: 100000,
        price: 0.78,
        vat: 23,
        discount: 0,
        type: 1
      }
    ]
  }
};

const paymentPrice = {
  orderNumber: "12345678",
  price: 499999.99
};

rest.createPayment(paymentOrderDetails).then(result => console.log(result));
rest.createPayment(paymentPrice).then(result => console.log(result));

console.log(
  rest.confirmPaymentFromQuery({
    ORDER_NUMBER: "ORDER-12345",
    PAYMENT: "12345678012",
    TIMESTAMP: "1212121212",
    PAID: "asdfasdfas",
    METHOD: 1,
    AUTH_CODE: "3E7E4970AFF62A44145B5A71841FBC74"
  }),
  rest.confirmPayment({
    orderNumber: "ORDER-12345",
    payment: "12345678012",
    timestamp: "1212121212",
    paid: "asdfasdfas",
    method: 1,
    authCode: "3E7E4970AFF62A44145B5A71841FBC74"
  })
);
