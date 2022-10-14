import { Selector, t } from "testcafe";
import { PRODUCTS_DIV } from "../object-repository/properties";

class ProductsPage {
  private productDiv: Selector;

  constructor() {
    this.productDiv = Selector(PRODUCTS_DIV);
  }

  async productArePresent() {
    await t.expect(this.productDiv).gt(0);
  }
}

export default new ProductsPage();
