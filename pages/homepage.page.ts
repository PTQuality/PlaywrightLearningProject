import { Page } from '@playwright/test';
import { SideMenu } from '../components/side-menu.component';

export class HomePage {
  constructor(private page: Page) {}

  sideMenu = new SideMenu(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeTransferModalButton = this.page.getByTestId('close-button');
  transferMessage = this.page.locator('#show_messages');
  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  toUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topUpProceedButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
  closeTopUpModalButton = this.page.getByTestId('close-button');
  moneyValueText = this.page.locator('#money_value');
  userName = this.page.getByTestId('user-name');
}
