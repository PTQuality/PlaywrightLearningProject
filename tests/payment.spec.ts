import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { HomePage } from '../pages/homepage.page';

test.describe('Payment tests', () => {
  let loginPage: LoginPage;
  let paymentPage: PaymentPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    homePage = new HomePage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await paymentPage.sideMenu.paymentLink.click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34567';
    const amountToTransfer = '222';
    const expectedMessage = 'Przelew wykonany! 222,00PLN dla Jan Nowak';

    //Act
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.accountNumberInput.fill(transferAccount);
    await paymentPage.amountNumberInput.fill(amountToTransfer);
    await paymentPage.transferMoneyButton.click();
    await paymentPage.closeModalButton.click();

    //Assert
    await expect(homePage.transferMessage).toHaveText(expectedMessage);
  });
});
