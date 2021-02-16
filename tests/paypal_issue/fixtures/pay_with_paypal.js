import { Selector, t } from 'testcafe'

fixture `musement.com`
  .page `https://www.musement.com/us/payment/?cartUuid=477ceb5e-d9ef-45fb-93e7-3229179c293b`
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Pay with PayPal', async (t) => {
  await t
    .typeText(Selector('div').withAttribute('data-test','firstName').child('input'), 'Elon', { replace: true })
    .typeText(Selector('div').withAttribute('data-test','lastName').child('input'), 'Musk', { replace: true })
    .typeText(Selector('div').withAttribute('data-test','email').child('input'), 'elon@musk.com', { replace: true })
    .click(Selector('section').withAttribute('data-test','PaymentComponent__PaymentMethods__paypal'));

  await t
    .switchToIframe(Selector('iframe').withAttribute('name',/^__zoid__paypal_buttons/))
    .hover(Selector('div').withAttribute('data-funding-source','paypal'))
    .click(Selector('div').withAttribute('data-funding-source','paypal'));

  // From line 22 testcafé hangs
  //
  // If performed manually, this test opens a new tab with the paypal.com page
  //
  // ...

});
