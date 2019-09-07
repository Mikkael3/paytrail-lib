const Koa = require("koa");
const Router = require("koa-router");

const PaytrailRest = require("paytrail-lib");

const app = new Koa();
const router = new Router();

const rest = new PaytrailRest("13466", "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ", {
  success: "https://paytrail-lib.tk/return",
  failure: "https://pytrail-lib.tk/return",
  notification: "https://paytrail-lib.tk/return"
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
        amount: 2.3,
        price: 0.78,
        vat: 23,
        discount: 0,
        type: 1
      }
    ]
  }
};

router.get("/", ctx => {
  ctx.body = "<div> Tee maksu <a href='/create'>Luo maksu</a></div>";
});

router.get("/create", async ctx => {
  const result = await rest.createPayment(paymentOrderDetails);
  ctx.redirect(result.url);
});

router.get("/return", ctx => {
  const result = rest.confirmPayment({
    orderNumber: req.query["ORDER_NUMBER"],
    timestamp: req.query["TIMESTAMP"],
    paid: req.query["PAID"],
    method: req.query["METHOD"],
    authCode: req.query["AUTH_CODE"]
  });
  ctx.body = `Payment confirmation: ${result} `;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("App listen port 3000");
