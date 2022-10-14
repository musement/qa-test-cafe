import { Selector, t } from "testcafe";
import {
  USERNAME_INPUT_BUTTON,
  PASSWORD_INPUT_BUTTON,
  LOGIN_SUBMIT_BUTTON,
} from "../object-repository/properties";

class LoginPage {
  private usernameInput: Selector;
  private passwordInput: Selector;
  private loginButton: Selector;

  constructor() {
    this.usernameInput = Selector(USERNAME_INPUT_BUTTON);
    this.passwordInput = Selector(PASSWORD_INPUT_BUTTON);
    this.loginButton = Selector(LOGIN_SUBMIT_BUTTON);
  }

  async login(username: string, password: string) {
    await t
      .typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.loginButton);
  }
}

export default new LoginPage();
