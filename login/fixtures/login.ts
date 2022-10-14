import LoginPage from "../pages/login";
import ProductsPage from "../pages/products";
import ErrorPage from "../pages/error";

import {
  USERNAME,
  PASSWORD,
  WRONG_PASSWORD,
} from "../object-repository/properties";

fixture`Login Suite`.page`https://www.saucedemo.com/`.beforeEach(async (t) => {
  await t.maximizeWindow();
});

test("Valid login", async () => {
  LoginPage.login(USERNAME, PASSWORD);
  ProductsPage.productArePresent();
});

test("Invalid login", async () => {
  LoginPage.login(USERNAME, WRONG_PASSWORD);
  ErrorPage.displayed();
});
