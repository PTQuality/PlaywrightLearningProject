import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/homepage.page';

test.describe('Homepage tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    await loginPage.login(userLogin, userPassword);
  });

  test('Transfer test', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    homePage.executeQuickPayment(receiverId, transferAmount, transferTitle);

    //Assert
    await expect(homePage.transferMessage).toHaveText(expectedTransferMessage);
  });

  test('Mobile top-up message test', async ({ page }) => {
    //Arrange
    const amountToTransfer = '50';
    const phoneNumberToBeSelected = '500 xxx xxx';
    const expectedTopUpMessage = `Doładowanie wykonane! ${amountToTransfer},00PLN na numer ${phoneNumberToBeSelected}`;

    //Act
    await homePage.executeMobileTopUp(
      phoneNumberToBeSelected,
      amountToTransfer,
    );

    //Arrange
    await expect(homePage.transferMessage).toHaveText(expectedTopUpMessage);
  });

  test('Mobile top-up value test', async ({ page }) => {
    //Arrange
    const amountTotransfer = '50';
    const phoneNumberToBeSelected = '500 xxx xxx';
    const initialBalance = await homePage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(amountTotransfer);

    //Act
    await homePage.executeMobileTopUp(
      phoneNumberToBeSelected,
      amountTotransfer,
    );

    //Assert
    await expect(homePage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
