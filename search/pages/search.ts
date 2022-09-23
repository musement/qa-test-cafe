import { Selector, t } from "testcafe";
import {
  SEARCH_INPUT_BUTTON,
  SEARCH_CRITERIA_VALUE,
  SUBMIT_BUTTON,
  FIRST_CITE_ELEMENT,
  FIRST_CITE_ELEMENT_EXPECTED_VALUE,
  REJECT_ALL_BUTTON,
} from "../object-repository/properties";

export default class SearchPage {
  private reject_all_button: Selector;
  private search_input_button: Selector;
  private submit_button: Selector;

  constructor() {
    this.reject_all_button = Selector(REJECT_ALL_BUTTON);
    this.search_input_button = Selector(SEARCH_INPUT_BUTTON);
    this.submit_button = Selector(SUBMIT_BUTTON);
  }

  async insertCriteriaAndSearch() {
    await t.click(this.reject_all_button);
    await t.expect(this.search_input_button.exists).ok();
    await t
      .typeText(this.search_input_button, SEARCH_CRITERIA_VALUE)
      .pressKey("enter");
  }

  async ensureFirstResultIsRelevantWithSearchCriteria() {
    await t
      .expect(Selector(FIRST_CITE_ELEMENT).innerText)
      .eql(FIRST_CITE_ELEMENT_EXPECTED_VALUE);
  }
}
