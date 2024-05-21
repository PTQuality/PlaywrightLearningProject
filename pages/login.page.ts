import { Page } from '@playwright/test';
import { loginData } from '../test-data/login.data';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginErrorMsg = this.page.getByTestId('error-login-id');
  passwordErrorMsg = this.page.getByTestId('error-login-password');

  async login() {
    await this.loginInput.fill(loginData.userLogin);
    await this.passwordInput.fill(loginData.userPassword);
    await this.loginButton.click();
  }
}
