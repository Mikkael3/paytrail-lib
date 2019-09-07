import { UrlSet as UrlSetData, RequestData } from "../interfaces";
import { validateUrl } from "../../utils/url-utils";

class UrlSet implements RequestData {
  private success!: string;
  private failure!: string;
  private notification!: string;

  constructor(urlSetData: UrlSetData) {
    const { success, failure, notification }: UrlSetData = urlSetData;
    this.setSuccess(success);
    this.setFailure(failure);
    this.setNotification(notification);
  }

  setSuccess = (success: string): void | never => {
    validateUrl(success);
    this.success = success;
  };

  setFailure = (failure: string): void | never => {
    validateUrl(failure);
    this.failure = failure;
  };

  setNotification = (notification: string): void | never => {
    validateUrl(notification);
    this.notification = notification;
  };

  toJson = (): UrlSetData => ({
    success: this.success,
    failure: this.failure,
    notification: this.notification
  });
}

export default UrlSet;
