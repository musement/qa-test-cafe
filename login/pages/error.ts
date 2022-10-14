import { Selector, t } from "testcafe";
import { ERROR_H3, ERROR_MESSAGE } from "../object-repository/properties";

class ErrorPage {
  private errorH3: Selector;

  constructor() {
    this.errorH3 = Selector(ERROR_H3);
  }

  async displayed() {
    await t.expect(this.errorH3.exists).ok();
    await t.expect(this.errorH3.innerText).eql(ERROR_MESSAGE);
  }
}

export default new ErrorPage();
