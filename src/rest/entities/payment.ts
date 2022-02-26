import {
  OrderDetails as OrderDetailsData,
  Payment as PaymentData,
  RequestData,
} from "../interfaces";

import OrderDetails from "./order-details";
import paymentConsts from "../../consts/payment";

const CURRENCIES = ["EUR"];
const LOCALES = ["fi_FI", "sv_SE", "en_US"];

class Payment implements RequestData<PaymentData> {
  private orderNumber: string = "";
  private referenceNumber?: number;
  private description?: string;
  private currency: string = "EUR";
  private locale: string = "fi_FI";
  private price?: number;
  private orderDetails?: OrderDetails;

  constructor(paymentData: PaymentData) {
    const {
      orderNumber,
      referenceNumber,
      description,
      currency,
      locale,
      orderDetails,
      price,
    }: PaymentData = paymentData;
    this.setOrderNumber(orderNumber);
    this.setReferenceNumber(referenceNumber);
    this.setDescription(description);
    this.setCurrency(currency);
    this.setLocale(locale);
    this.setOrderDetails(orderDetails);
    this.setPrice(price);
  }

  setOrderNumber = (orderNumber: string): void | never => {
    if (orderNumber.length > 64) {
      throw new Error("Order Number cannot be longer than 64 chars.");
    }
    this.orderNumber = orderNumber;
  };

  setReferenceNumber = (referenceNumber: number | undefined): void | never => {
    //todo reference number validation
    if (
      typeof referenceNumber !== "undefined" &&
      `${referenceNumber}`.length > 22
    ) {
      throw new Error("Reference Number cannot be longer than 22 chars.");
    }
    this.referenceNumber = referenceNumber;
  };

  setDescription = (description: string | undefined): void | never => {
    if (typeof description !== "undefined" && description.length > 65000) {
      throw new Error("Description cannot be longer than 65000 chars.");
    }
    this.description = description;
  };

  setCurrency = (currency: string | undefined): void | never => {
    if (!currency) return;
    if (!CURRENCIES.find((cur: string): boolean => cur === currency)) {
      throw new Error("Invalid currency.");
    }

    this.currency = currency;
  };

  setLocale = (locale: string | undefined): void | never => {
    if (!locale) return;
    if (!LOCALES.find((loc: string): boolean => loc === locale)) {
      throw new Error("Invalid Locale.");
    }

    this.locale = locale;
  };

  setOrderDetails = (orderDetails: OrderDetailsData | undefined): void => {
    if (!orderDetails) return;
    this.orderDetails = new OrderDetails(orderDetails);
  };

  setPrice = (price: number | undefined): void | never => {
    if (!price) return;
    if (price < paymentConsts.MIN_PRICE || price > paymentConsts.MAX_PRICE) {
      throw new Error(
        `Invalid price. Min price: ${paymentConsts.MIN_PRICE} and max price : ${paymentConsts.MAX_PRICE}`
      );
    }

    this.price = price;
  };

  toJson = () => {
    if (this.price && this.orderDetails)
      throw Error(
        "Invalid payment: Payment can't contain both price and orderDetails"
      );

    if (!this.price && !this.orderDetails)
      throw Error(
        "Invalid payment: Payment should have either price or orderDetails"
      );
    let json: PaymentData = {
      orderNumber: this.orderNumber,
      currency: this.currency,
      locale: this.locale,
    };
    if (this.referenceNumber) json.referenceNumber = this.referenceNumber;
    if (this.description) json.description = this.description;
    if (this.price) json.price = this.price;
    if (this.orderDetails) json.orderDetails = this.orderDetails.toJson();
    return json;
  };
}

export default Payment;
