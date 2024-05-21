import { Page } from '@playwright/test';

export class SideMenu {
  constructor(private page: Page) {}

  // await page.getByRole('link', { name: 'mój pulpit' }).click();
  homeLink = this.page.getByRole('link', { name: 'mój pulpit' });
  
  // await page.getByRole('link', { name: 'szybki przelew' }).click();
  // await page.getByRole('link', { name: 'doładowanie telefonu' }).click();
  // await page.getByRole('link', { name: 'konta osobiste' }).click();

  // await page.getByRole('link', { name: 'płatności' }).click();
  paymentLink = this.page.getByRole('link', { name: 'płatności' });

  // await page.getByRole('link', { name: 'raporty', exact: true }).click();
  // await page.getByRole('link', { name: 'raporty (iframe)' }).click();
  // await page.getByRole('link', { name: 'wykresy' }).click();
  // await page.getByRole('link', { name: 'tabele danych' }).click();
  // await page.getByRole('link', { name: 'ustawienia' }).click();
}
