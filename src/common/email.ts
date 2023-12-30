export class Email {
  readonly email: string;

  constructor(email: string) {
    const regexEmail = RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/);
    if (!regexEmail.test(email.trim())) throw new Error("invalid_email");
    this.email = email;
  }
}
