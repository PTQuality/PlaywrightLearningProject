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
  test(
    'successful login with correct credentials',
    {
      tag: '@login',
      annotation: {
        type: 'Happy path',
        description: 'Basic happy path test for login',
      },
    },
    async ({ page }) => {
      //Arrange
      const expectedUsername = 'Jan Demobankowy';

      //Act
      await loginPage.login(userLogin, userPassword);

      //Assert
      const homePage = new HomePage(page);
      await expect(homePage.userName).toHaveText(expectedUsername);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: ['@login', '@unhappy path'] },
    async ({ page }) => {
      //Arrange
      const tooShortUserLogin = 'tester';
      const expectedLoginErrorMsg = 'identyfikator ma min. 8 znaków';

      //Act
      await loginPage.login(tooShortUserLogin);
      await loginPage.loginInput.blur();

      //Assert
      await expect(loginPage.loginErrorMsg).toHaveText(expectedLoginErrorMsg);
    },
  );

  test(
    'unsuccessful login with to short password ',
    { tag: ['@login', '@unhappy path', '@smoke'] },
    async ({ page }) => {
      //Arrange
      const tooShortUserPassword = '123456';
      const expectedPasswordErrorMsge = 'hasło ma min. 8 znaków';

      //Act
      await loginPage.login(userLogin, tooShortUserPassword);
      await loginPage.passwordInput.blur();

      //Assert
      await expect(loginPage.passwordErrorMsg).toHaveText(
        expectedPasswordErrorMsge,
      );
    },
  );
});
