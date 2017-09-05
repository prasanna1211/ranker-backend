const puppeteer = require('puppeteer');
const getUrls = require('get-urls');

const times = require('lodash/times');
const concat = require('lodash/concat');
const isNull = require('lodash/isNull');

const getRandomSeconds = require('./getRandomSecondsBetweenRange.js');

const appConstants = require('./appConstants.js');

async function scrapeGoogleResult(keyword, domain, numberOfPages) {
  console.log(' started ');
  const {
    pageWaitDurationRangeStart: start,
    pageWaitDurationRangeEnd: end,
  } = appConstants;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(domain);

  page.focus('input[title="Search"]');

  await page.type(keyword, { delay: getRandomSeconds(100, 200) });

  const submit = await page.$('input[value="Google Search"]');
  await submit.click();

  await page.waitForNavigation();

  // const result
  const pageOneText = await page.plainText();
  if (isNull(pageOneText)) {
    return {
      error: true,
      errorMessage: 'Failed to fetch page 1'
    };
  }
  let result = Array.from(getUrls(pageOneText));

  let index = 1;
  for (var i = index + 1; i <= numberOfPages ; i++) {
    const selector = `a[aria-label="Page ${i}"]`;
    const nextPageNavigateButton = await page.$(selector);

    await page.waitFor(getRandomSeconds(start, end));
    await nextPageNavigateButton.click();
    await page.waitForNavigation();

    const currentPageText = await page.plainText();
    if (isNull(currentPageText)) {
      return {
        error: true,
        errorMessage: `Failed to fetch page ${i}`
      };
    }
    result = concat(result, Array.from(getUrls(currentPageText)));
  }

  browser.close();
  return {
    success: true,
    result,
  };
}

module.exports = {
  scrapeGoogleResult: scrapeGoogleResult,
};
