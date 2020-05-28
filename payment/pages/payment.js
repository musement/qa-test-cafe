import { Selector, t } from 'testcafe'
import {
  EXTRA_CUSTOMER_DATA_PHONE_FOR_EMERGENCIES_BUTTON,
  PHONE_FOR_EMERGENCIES_VALUE
} from '../../object-repository/properties'

export default class PaymentPage {
  constructor () {
    this.extra_customer_data_phone_for_emergencies = Selector(EXTRA_CUSTOMER_DATA_PHONE_FOR_EMERGENCIES_BUTTON)
  }

  async fillExtraCustomerDataPhoneForEmergencies() {
    await t.expect(this.extra_customer_data_phone_for_emergencies.exists).ok()
    await t.typeText(this.extra_customer_data_phone_for_emergencies, PHONE_FOR_EMERGENCIES_VALUE)
  }

  async extraCustomerDataPhoneForEmergenciesIsFulFilled() {
    await t.expect(this.extra_customer_data_phone_for_emergencies.value)
      .eql(PHONE_FOR_EMERGENCIES_VALUE)
  }
}
