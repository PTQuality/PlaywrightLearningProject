import { Page } from '@playwright/test';
import { SideMenu } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenu(this.page);

  transferReceiver = this.page.getByTestId('transfer_receiver');
  accountNumberInput = this.page.getByTestId('form_account_to');
  amountNumberInput = this.page.getByTestId('form_amount');
  transferMoneyButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeModalButton = this.page.getByTestId('close-button');
  //   await page.getByTestId('transfer_receiver').fill(transferReceiver);
  //   await page.getByTestId('form_account_to').fill(transferAccount);
  //   await page.getByTestId('form_amount').fill(amountToTransfer);
  //   await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  //   await page.getByTestId('close-button').click();
}
