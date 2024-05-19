import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Homepage tests', () => {
  //Arrange
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Transfer test', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedTransferMessage,
    );
  });

  test('Mobile top-up message test', async ({ page }) => {
    //Arrange
    const amountToTtransfer = '50';
    const phoneNumberToBeSelected = '500 xxx xxx';
    const expectedTopUpMessage = `Doładowanie wykonane! ${amountToTtransfer},00PLN na numer ${phoneNumberToBeSelected}`;

    //Act
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(phoneNumberToBeSelected);
    await page.locator('#widget_1_topup_amount').fill(amountToTtransfer);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedTopUpMessage,
    );
  });

  test('Mobile top-up value test', async ({ page }) => {
    //Arrange
    const amountToTtransfer = '50';
    const phoneNumberToBeSelected = '500 xxx xxx';
    const expectedTopUpMessage = `Doładowanie wykonane! ${amountToTtransfer},00PLN na numer ${phoneNumberToBeSelected}`;
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(amountToTtransfer);

    //Act
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(phoneNumberToBeSelected);
    await page.locator('#widget_1_topup_amount').fill(amountToTtransfer);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
