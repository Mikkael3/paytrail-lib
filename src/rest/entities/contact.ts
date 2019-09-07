import {
  Contact as ContactData,
  Address as AddressData,
  RequestData
} from "../interfaces";
import Address from "./address";
import { validateEmail } from "../../utils/email-utils";

enum Type {
  NORMAL = 1,
  SHIPPING = 2,
  HANDLING = 3
}

class Contact implements RequestData {
  private firstName!: string;
  private lastName!: string;
  private companyName?: string;
  private email!: string;
  private telephone?: string;
  private mobile?: string;
  private address!: Address;

  constructor(contactData: ContactData) {
    const {
      firstName,
      lastName,
      companyName,
      email,
      telephone,
      mobile,
      address
    } = contactData;
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setCompanyName(companyName);
    this.setEmail(email);
    this.setTelephone(telephone);
    this.setMobile(mobile);
    this.setAddress(address);
  }

  setFirstName = (firstName: string): void | never => {
    if (firstName.length > 64) throw new Error("Firstname max length is 64.");
    this.firstName = firstName;
  };

  setLastName = (lastName: string): void | never => {
    if (lastName.length > 64) throw new Error("Lastname max length is 64.");
    this.lastName = lastName;
  };

  setCompanyName = (companyName: string | undefined): void | never => {
    if (!companyName) return;
    if (companyName.length > 128)
      throw new Error("Company Name max length is 128.");
    this.companyName = companyName;
  };

  setEmail = (email: string): void | never => {
    validateEmail(email);
    this.email = email;
  };

  setTelephone = (telephone: string | undefined): void | never => {
    if (!telephone) return;
    if (telephone.length > 64) throw new Error("Telephone max length is 64.");
    this.telephone = telephone;
  };

  setMobile = (mobile: string | undefined): void | never => {
    if (!mobile) return;
    if (mobile.length > 64) throw new Error("Mobile max length is 64.");
    this.mobile = mobile;
  };

  setAddress = (address: AddressData): void | never => {
    this.address = new Address(address);
  };

  toJson = (): ContactData => {
    const json: ContactData = {
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      email: this.email,
      address: this.address.toJson()
    };

    if (this.telephone) json.telephone = this.telephone;
    if (this.mobile) json.mobile = this.mobile;
    return json;
  };
}
export default Contact;
