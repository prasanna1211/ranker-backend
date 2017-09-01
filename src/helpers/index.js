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
  let result = [...getUrls(pageOneText)];

  console.log('til page 1 ....... ', result);

  const pageTwoNavigateButton = await page.$('a[aria-label="Page 2"]');
  await pageTwoNavigateButton.click();
  await page.waitForNavigation();

  const pageTwoText = await page.plainText();
  result.push(...getUrls(pageTwoText));

  const pageThreeNavigateButton = await page.$('a[aria-label="Page 3"]');
  await pageThreeNavigateButton.click();
  await page.waitForNavigation();

  const pageThreeText = await page.plainText();
  result.push(...getUrls(pageThreeText));

  const pageFourNavigateButton = await page.$('a[aria-label="Page 4"]');
  await pageFourNavigateButton.click();
  await page.waitForNavigation();

  const pageFourText = await page.plainText();
  result.push(...getUrls(pageFourText));

  const pageFiveNavigateButton = await page.$('a[aria-label="Page 5"]');
  await pageFiveNavigateButton.click();

  await page.waitForNavigation();

  const pageFiveText = await page.plainText();
  result.push(...getUrls(pageFiveText));

  console.log(result);


  browser.close();
}

run();
