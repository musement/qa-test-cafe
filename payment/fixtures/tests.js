
/*
import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('My first test', async t => {
    // Test code
    await t
        .debug()
        .setNativeDialogHandler(() => true);
});
*/

import { Selector } from 'testcafe';
import PaymentPage from '../pages/payment'

const paymentPage = new PaymentPage()


fixture `Payment with extra customer data`
  .page `https://qa.musement.com/us/payment/?cartUuid=8eb4d0b5-fee3-4dd9-959d-0369602892a8`
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Fulfill extra customer data phone for emergencies', async (t) => {
  await paymentPage.fillExtraCustomerDataPhoneForEmergencies()
  await paymentPage.extraCustomerDataPhoneForEmergenciesIsFulFilled()
});
