// NotFound.spec.tsx
// @ts-ignore
import puppeteer from 'puppeteer';

describe('NotFound', () => {
  test('renders the player', async () => {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/404');
    await page.waitForSelector('h1');

    const html = await page.$eval('h1', (e: any) => e.innerHTML);
    expect(html).toBe('404: Page not found');

    // tslint:disable-next-line:no-magic-numbers
    await page.waitFor(3000);
    browser.close();
  // tslint:disable-next-line:no-magic-numbers
  }, 160000);
});
