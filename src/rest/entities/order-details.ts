import {
  OrderDetails as OrderDetailsData,
  Contact as ContactData,
  Product as ProductData,
  RequestData
} from "../interfaces";

import Contact from "./contact";
import Product from "./product";
import paymentConsts from "../../consts/payment";

class OrderDetails implements RequestData {
  private includeVat: number = 0;
  private contact!: Contact;
  private products!: Product[];

  constructor(orderDetailsData: OrderDetailsData) {
    const {
      includeVat,
      contact,
      products
    }: OrderDetailsData = orderDetailsData;
    this.setIncludeVat(includeVat);
    this.setContact(contact);
    this.setProducts(products);
  }

  setIncludeVat = (includeVat: boolean | number): void => {
    this.includeVat = includeVat ? 1 : 0;
  };

  setContact = (contactData: ContactData): void => {
    this.contact = new Contact(contactData);
  };

  setProducts = (products: ProductData[]): void | never => {
    this.products = products.map(
      (product: ProductData): Product => new Product(product)
    );
  };

  toJson = (): OrderDetailsData => {
    const json = {
      includeVat: this.includeVat,
      contact: this.contact.toJson(),
      products: this.products.map(product => product.toJson())
    };
    const price: number = json.products
      .map((product: ProductData): number => product.price * product.amount)
      .reduce((a: number, b: number): number => a + b);
    if (price < paymentConsts.MIN_PRICE || price > paymentConsts.MAX_PRICE)
      throw new Error(
        "Min price is 0.65 for products and max price " +
          paymentConsts.MAX_PRICE
      );
    return json;
  };
}

export default OrderDetails;
