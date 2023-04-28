import BasePage from './base-page';

export default class DerivedPage extends BasePage {
  constructor() {
    super();
  }

  sayHello() {
    console.log("hello");
  }
}
