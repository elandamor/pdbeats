// Songs.spec.tsx

// tslint:disable:no-magic-numbers
// @ts-ignore
import puppeteer from 'puppeteer';

describe('Songs', () => {
  test('renders list/grid of songs', async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/songs');
    await page.waitForSelector('.c-tracks');

    browser.close();
  }, 160000);
});
