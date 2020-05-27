import { Selector } from 'testcafe';
import PaymentPage from '../pages/payment'

const paymentPage = new PaymentPage()

const baseUrl = process.env.MUSEMENT_B2C_BASE_URL

fixture `Payment with extra customer data`
  .page `${baseUrl}/us/payment?cartUuid=8eb4d0b5-fee3-4dd9-959d-0369602892a8`
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Fulfill extra customer data phone for emergencies', async (t) => {
  await paymentPage.fillExtraCustomerDataPhoneForEmergencies()
  await paymentPage.extraCustomerDataPhoneForEmergenciesIsFulFilled()
});
