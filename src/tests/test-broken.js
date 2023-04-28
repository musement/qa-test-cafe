import { fixture, test } from 'testcafe';
import DerivedPage from '../pages/derived-page';

fixture('Getting Started').page(
  'https://devexpress.github.io/testcafe/example'
);

test('broken', async () => {
  return new DerivedPage();
});
