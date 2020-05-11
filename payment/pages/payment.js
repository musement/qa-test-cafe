import { Selector, t } from 'testcafe'

export default class PaymentPage {
  constructor () {
    this.extra_customer_data_phone_for_emergencies = Selector('form.cl:nth-child(3) > section:nth-child(1) > div:nth-child(1) > input:nth-child(2)')
  }

  async fillExtraCustomerDataPhoneForEmergencies() {
    await t.expect(this.extra_customer_data_phone_for_emergencies.exists).ok()
    await t.typeText(this.extra_customer_data_phone_for_emergencies, '3468989899')
  }

  async extraCustomerDataPhoneForEmergenciesIsFulFilled() {
    await t.expect(this.extra_customer_data_phone_for_emergencies.value)
      .eql('3468989899')
  }
}
