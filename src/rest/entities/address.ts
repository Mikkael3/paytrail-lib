import { Address as AddressData, RequestData } from "../interfaces";

class Address implements RequestData<AddressData> {
  private street!: string;
  private postalCode!: string;
  private postalOffice!: string;
  private country!: string;

  constructor(addressData: AddressData) {
    const { street, postalCode, postalOffice, country }: AddressData =
      addressData;
    this.setStreet(street);
    this.setPostalCode(postalCode);
    this.setPostalOffice(postalOffice);
    this.setCountry(country);
  }

  setStreet = (street: string): void | never => {
    if (street.length > 64) throw new Error("Street max length is 64.");
    this.street = street;
  };

  setPostalCode = (postalCode: string): void | never => {
    if (postalCode.length > 64)
      throw new Error("Postal Code max length is 64.");
    this.postalCode = postalCode;
  };

  setPostalOffice = (postalOffice: string): void | never => {
    if (postalOffice.length > 64)
      throw new Error("Postal Office max length is 64.");
    this.postalOffice = postalOffice;
  };

  setCountry = (country: string): void | never => {
    //todo validate country format
    if (country.length > 2) throw new Error("Country max length is 2.");
    this.country = country;
  };

  toJson = () => {
    const data = {
      street: this.street,
      postalCode: this.postalCode,
      postalOffice: this.postalOffice,
      country: this.country,
    };
    return data;
  };
}

export default Address;
