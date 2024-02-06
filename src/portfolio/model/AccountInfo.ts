import { Result } from "../../common/base/Result";
import { VO } from "../../common/base/ValueObject";

export interface AccountInfoProps {
  account_key?: string;
  account_id?: string;
}

export class AccountInfo extends VO<AccountInfoProps> {
  constructor(props: AccountInfoProps) {
    super(props);
  }

  static new(props: AccountInfoProps): Result<AccountInfo> {
    const account_id =
      props.account_key && !props.account_id ? "invalid_account_id" : null;
    const account_key =
      props.account_id && !props.account_key ? "invalid_account_key" : null;

    const errors = account_id || account_key;

    return errors ? Result.fail(errors) : Result.ok(new AccountInfo(props));
  }

  isValid(): boolean {
    return Boolean(this.value.account_id && this.value.account_key);
  }
}
