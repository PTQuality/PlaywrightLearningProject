import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/homepage.page';

test.describe('User login to Demobank', () => {
  const userLogin = loginData.userLogin;
  const userPassword = loginData.userPassword;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });
  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const expectedUsername = 'Jan Demobankowy';

    //Act
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // await loginPage.login();

    //Assert
    const homePage = new HomePage(page);
    await expect(homePage.userName).toHaveText(expectedUsername);
  });

  test('unsuccessful login with to short username', async ({ page }) => {
    //Arrange
    const tooShortUserLogin = 'tester';
    const expectedLoginErrorMsg = 'identyfikator ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(tooShortUserLogin);
    await loginPage.loginInput.blur();

    //Assert
    await expect(loginPage.loginErrorMsg).toHaveText(expectedLoginErrorMsg);
  });

  test('unsuccessful login with to short password', async ({ page }) => {
    //Arrange
    const tooShortUserPassword = '123456';
    const expectedPasswordErrorMsge = 'hasło ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(tooShortUserPassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.passwordErrorMsg).toHaveText(
      expectedPasswordErrorMsge,
    );
  });
});
