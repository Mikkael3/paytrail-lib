interface UrlSet {
  success: string;
  failure: string;
  notification: string;
}
interface Address {
  street: string;
  postalCode: string;
  postalOffice: string;
  country: string;
}

interface Product {
  title: string;
  code?: string;
  amount: number;
  price: number;
  vat: number;
  discount?: number;
  type?: number;
}

interface Contact {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  telephone?: string;
  mobile?: string;
  address: Address;
}

interface OrderDetails {
  includeVat: boolean | number;
  contact: Contact;
  products: Product[];
}

interface Payment {
  orderNumber: string;
  referenceNumber?: number;
  description?: string;
  currency?: string;
  locale?: string;
  orderDetails?: OrderDetails;
  price?: number;
}

interface RequestData<T> {
  toJson: () => T;
}

export {
  RequestData,
  Payment,
  UrlSet,
  OrderDetails,
  Contact,
  Address,
  Product,
};
