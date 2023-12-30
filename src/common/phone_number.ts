export class PhoneNumber {
  readonly phoneNumber: string;

  constructor(phone: string) {
    this.phoneNumber = phone;
  }

  get countryCode(): string {
    return this.phoneNumber.slice(0, 2);
  }
}
