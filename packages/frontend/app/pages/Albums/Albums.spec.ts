// Albums.spec.tsx

// tslint:disable:no-magic-numbers
// @ts-ignore
import puppeteer from 'puppeteer';

describe('Albums', () => {
  test('renders list/grid of albums', async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/albums');
    await page.waitForSelector('.c-albums');

    browser.close();
  }, 160000);
});
