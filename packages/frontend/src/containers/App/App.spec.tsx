// App.spec.tsx
// @ts-ignore
import puppeteer from 'puppeteer';

describe('App', () => {
  test('renders the player', async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.c-player');

    browser.close();
  // tslint:disable-next-line:no-magic-numbers
  }, 160000);
});
