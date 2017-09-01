const puppeteer = require('puppeteer');
const getUrls = require('get-urls');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  page.focus('input[title="Search"]');

  await page.type('React JS development company', { delay: 100 });

  const submit = await page.$('input[value="Google Search"]');
  await submit.click();

  await page.waitForNavigation();

  const pageOneText = await page.plainText();
  let result = getUrls(pageOneText);

  await page.waitFor(4000);

  const pageTwoNavigateButton = await page.$('a[aria-label="Page 2"]');
  pageTwoNavigateButton.click();

  await page.waitFor(4000);
  const pageThreeText = await page.plainText();
  result.add(getUrls(pageThreeText));
  const pageThreeNavigateButton = await page.$('a[aria-label="Page 3"]');
  pageThreeNavigateButton.click();

  await page.waitFor(4000);
  const pageFourText = await page.plainText();
  result.add(getUrls(pageFourText));
  const pageFourNavigateButton = await page.$('a[aria-label="Page 4"]');
  pageFourNavigateButton.click();

  await page.waitFor(4000);
  const pageFiveText = await page.plainText();
  result.add(getUrls(pageFiveText));
  const pageFiveNavigateButton = await page.$('a[aria-label="Page 5"]');
  pageFiveNavigateButton.click();

  await page.waitForNavigation();
  console.log(result);
  await page.waitFor(40000);

  await page.screenshot({path: 'screenshots/github.png'});

  browser.close();
}

run();
