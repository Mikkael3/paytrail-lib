import { Product as ProductData, RequestData } from "../interfaces";

const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

const TYPES = [1, 2, 3];

class Product implements RequestData<ProductData> {
  private title!: string;
  private code?: string;
  private amount: number = 1;
  private price!: number;
  private vat!: number;
  private discount: number = 0;
  private type: number = 1;

  constructor(productData: ProductData) {
    const { title, code, amount, price, vat, discount, type }: ProductData =
      productData;
    this.setTitle(title);
    this.setCode(code);
    this.setAmount(amount);
    this.setPrice(price);
    this.setVat(vat);
    this.setDiscount(discount);
    this.setType(type);
  }

  setTitle = (title: string): void | never => {
    if (title.length > 255) throw new Error("Title max length is 255.");
    this.title = title;
  };

  setCode = (code: string | undefined): void | never => {
    if (!code) return;
    if (code.length > 16) throw new Error("Code max length is 16.");
    this.code = code;
  };

  setAmount = (amount: number): void | never => {
    // todo maybe some kind of validation amount
    if (amount < 0) throw new Error("Amount must be positive value.");
    this.amount = amount;
  };

  setPrice = (price: number): void | never => {
    // todo maybe some kind of validation price
    if (price < 0) throw Error("Price must be positive value.");
    this.price = price;
  };

  setVat = (vat: number): void | never => {
    // todo maybe some kind of validation vat
    if (vat < 0) throw Error("Vat must be positive value.");
    this.vat = vat;
  };

  setDiscount = (discount: number | undefined): void | never => {
    if (!discount) return;
    if (discount <= MAX_DISCOUNT && discount >= MIN_DISCOUNT)
      throw new Error("Discount should be number between 0 - 100");
    this.discount = discount;
  };

  setType = (type: number | undefined): void | never => {
    if (!type) return;
    if (!TYPES.find((t: number): boolean => t === type))
      throw new Error("Invalid Type");
    this.type = type;
  };
  //todo total price amount * price
  toJson = () => {
    let json: ProductData = {
      title: this.title,
      amount: this.amount,
      price: this.price,
      vat: this.vat,
      discount: this.discount,
      type: this.type,
    };
    if (this.code) json.code = this.code;
    return json;
  };
}

export default Product;
