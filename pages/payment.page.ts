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

  async makePayment(
    receiver: string,
    accountNumber: string,
    amount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(receiver);
    await this.accountNumberInput.fill(accountNumber);
    await this.amountNumberInput.fill(amount);
    await this.transferMoneyButton.click();
    await this.closeModalButton.click();
  }
}
