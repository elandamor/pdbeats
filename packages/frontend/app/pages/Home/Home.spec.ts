// Home.spec.tsx
// @ts-ignore
import puppeteer from 'puppeteer';

describe('Home', () => {
  test('renders main navigation', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.c-nav');

    browser.close();
  // tslint:disable-next-line:no-magic-numbers
  }, 160000);
});
