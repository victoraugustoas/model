import { VO } from "../../common/base/value_object";

export class AccountID extends VO<string> {
  constructor(account_id: string) {
    // regex to validate this account number 35700/102166
    const regex = new RegExp("d+/d+");
    if (regex.test(account_id)) {
      super(account_id);
    } else {
      throw new Error("account_id_pattern_invalid");
    }
  }
}
