import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  const userLogin = loginData.userLogin;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test.only('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const expectedUsername = 'Jan Demobankowy';
    //Act

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('unsuccessful login with to short username', async ({ page }) => {
    const tooShortUserLogin = 'tester';
    const expectedLoginErrorMsg = 'identyfikator ma min. 8 znaków';

    await page.getByTestId('login-input').fill(tooShortUserLogin);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedLoginErrorMsg,
    );
  });

  test('unsuccessful login with to short password', async ({ page }) => {
    const tooShortUserPassword = '123456';
    const expectedPasswordErrorMsge = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(tooShortUserPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedPasswordErrorMsge,
    );
  });
});
