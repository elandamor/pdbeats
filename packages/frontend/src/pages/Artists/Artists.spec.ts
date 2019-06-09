// Artists.spec.tsx
// @ts-ignore
import puppeteer from 'puppeteer';

describe('Artists', () => {
  test('renders a list/grid of artists', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/artists');
    await page.waitForSelector('.c-artists');

    // tslint:disable-next-line:no-magic-numbers
    await page.waitFor(3000);
    browser.close();
  // tslint:disable-next-line:no-magic-numbers
  }, 160000);
});
