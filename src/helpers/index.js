const puppeteer = require('puppeteer');
const getUrls = require('get-urls');

const times = require('lodash/times');
const concat = require('lodash/concat');
const isNull = require('lodash/isNull');

const getRandomSeconds = require('./getRandomSecondsBetweenRange.js');

const appConstants = require('./appConstants.js');

async function scrapeGoogleResult(keyword, domain, numberOfPages) {
  console.log(' started ', keyword, domain);
  const randomUserAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36',
    'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36',
  ];
  const {
    pageWaitDurationRangeStart: start,
    pageWaitDurationRangeEnd: end,
  } = appConstants;

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  page.setUserAgent(randomUserAgents[getRandomSeconds(0, 8)]);
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
