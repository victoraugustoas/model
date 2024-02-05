import { VO } from "../../common/base/value_object";

export class AccountKey extends VO<string> {
  constructor(account_key: string) {
    if (account_key.length > 0) {
      super(account_key);
    } else {
      throw new Error("account_key_pattern_invalid");
    }
  }
}
