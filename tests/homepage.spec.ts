import { test, expect } from "@playwright/test";

test.describe("Homepage tests", () => {
  test("Transfer test", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("150");
    await page.locator("#widget_1_transfer_title").fill("pizza");

    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
    );
  });

  test.only("Mobile top-up test", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("50");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx"
    );
  });
});

// Wykonaj manualny test doładowania telefonu
// Dodaj nowy test do pulpit.spec.ts
// Sugerowana nazwa nowego testu: successful mobile top-up
// Użyj codegen do nagrania testu i wygenerowania kodu
// Pomiń nagrywanie logowania
// Na stronie Pulpit przejdź do widoku doładowanie telefonu
// Wybierz numer telefonu (pierwszy z listy), kwotę 50 i zaznacz checkbox
// Kliknięciu przycisk doładuj telefon oraz zaakceptuj okno z podsumowaniem operacji
// Zweryfikuj tekst wiadomości, możesz skorzystać z istniejącego kodu w innym teście
// Wklej uzyskany kod do nowo przygotowanego testu

// Pamiętaj o dodaniu odpowiedniej asercji dla wiadomości
// Usuń lub zakomentuj nadmiarowy kod np: niepotrzebne akcje z click()
// Sprawdź swój test – pamiętaj o opcji only
// Celowo uszkodź asercję, tak aby test zakończył się niepowodzeniem i uruchom ponownie test – czy wyniki jakie otrzymałeś są czytelne?
// Następnie napraw test i uruchom wszystkie testy razem
