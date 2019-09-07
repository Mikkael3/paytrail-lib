import { Payment, UrlSet } from "./interfaces";
import PaymentEntity from "./entities/payment";
import UrlSetEntity from "./entities/url-set";
import fetch from "node-fetch";

const crypto = require("crypto");
const paytrailUrl: string = "https://payment.paytrail.com/api-payment/create";

interface PaymentDetails {
  orderNumber: string;
  token: string;
  url: string;
}

interface Confirm {
  orderNumber: string;
  timestamp: string;
  paid?: string;
  method?: number;
  authCode: string;
}

interface ConfirmQuery {
  ORDER_NUMBER: string;
  TIMESTAMP: string;
  PAID?: string;
  METHOD?: number;
  AUTH_CODE: string;
}

class PaytrailRest {
  private urlSet!: UrlSetEntity;

  constructor(
    private merchantId: string,
    private merchantSecret: string,
    urlSet: UrlSet
  ) {
    this.setUrlSet(urlSet);
  }

  private setUrlSet = (urlSet: UrlSet): void => {
    this.urlSet = new UrlSetEntity(urlSet);
  };

  createPayment = async (
    paymentData: Payment
  ): Promise<PaymentDetails> | never => {
    try {
      const payment = new PaymentEntity(paymentData);
      const body: Payment = payment.toJson();
      const urlSet: UrlSet = this.urlSet.toJson();
      const result = await fetch(paytrailUrl, {
        method: "POST",
        body: JSON.stringify({ ...body, urlSet }),
        headers: {
          "Content-Type": "application/json",
          "X-Verkkomaksut-Api-Version": "1",
          Authorization:
            "Basic " +
            Buffer.from(`${this.merchantId}:${this.merchantSecret}`).toString(
              "base64"
            )
        }
      });
      const json = await result.json();
      if (result.ok) return json;
      throw new Error(`Paytrail Rest api-error: ${JSON.stringify(json)}`);
    } catch (error) {
      throw new Error("Paytrail-lib error: " + error.message);
    }
  };

  confirmPayment = ({
    orderNumber,
    timestamp,
    paid,
    method,
    authCode
  }: Confirm): boolean => {
    return this.checkAuthCode(
      [orderNumber, timestamp, paid, method, this.merchantSecret].filter(
        item => item
      ),
      authCode
    );
  };

  confirmPaymentFromQuery = ({
    ORDER_NUMBER: orderNumber,
    TIMESTAMP: timestamp,
    PAID: paid,
    METHOD: method,
    AUTH_CODE: authCode
  }: ConfirmQuery): boolean => {
    return this.checkAuthCode(
      [orderNumber, timestamp, paid, method, this.merchantSecret].filter(
        item => item
      ),
      authCode
    );
  };

  private checkAuthCode = (params: any[], code: string): boolean =>
    crypto
      .createHash("md5")
      .update(params.join("|"))
      .digest("hex")
      .toUpperCase() === code;
}

export default PaytrailRest;
