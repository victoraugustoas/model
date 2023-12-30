import { Country, CountryProps } from "../common/country";
import { Email } from "../common/email";
import { Entity, EntityProps } from "../common/entity";
import { PersonName } from "../common/person_name";
import { PhoneNumber } from "../common/phone_number";
import { Address, AddressProps } from "./address";
import { BrazilOnboarding } from "./onboarding/brazil_onboarding";
import { LatamOnboarding } from "./onboarding/latam_onboarding";
import { Onboarding, OnboardingProps } from "./onboarding/onboarding";

export type RefSource = "organic" | "b2b" | "marketing" | "b2c";

export interface CustomerProps extends EntityProps {
  name: string;
  email: string;
  phoneNumber: string;
  refSource: RefSource;
  country: CountryProps;
  internationalBrokerConsultantId?: number;
  onboarding?: OnboardingProps;
  address?: AddressProps;
}

export class Customer extends Entity<Customer, CustomerProps> {
  readonly name: PersonName;
  readonly email: Email;
  readonly phoneNumber: PhoneNumber;
  readonly country: Country;
  readonly internationalBrokerConsultantId?: number;
  readonly onboarding?: Onboarding;
  readonly address?: Address;

  constructor(props: CustomerProps) {
    super(props);

    this.name = new PersonName(props.name);
    this.email = new Email(props.email);
    this.phoneNumber = new PhoneNumber(props.phoneNumber);
    this.country = new Country(props.country);
    this.internationalBrokerConsultantId =
      props.internationalBrokerConsultantId ?? 9999;

    if (this.country.isBrazil) {
      this.onboarding = props.onboarding
        ? new BrazilOnboarding(props.onboarding)
        : undefined;
    } else {
      this.onboarding = props.onboarding
        ? new LatamOnboarding(props.onboarding)
        : undefined;
    }

    if (props.address) this.address = new Address(props.address);
  }

  get isOnboardingFilled(): boolean {
    if (!this.onboarding) return false;
    if (!this.address) return false;
    if (this.internationalBrokerConsultantId !== 9999) return false;

    return this.onboarding.isFilledAllMandatoryData;
  }
}
