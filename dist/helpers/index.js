'use strict';

var scrapeGoogleResult = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyword, domain, numberOfPages) {
    var randomUserAgents, start, end, browser, page, submit, pageOneText, result, index, i, selector, nextPageNavigateButton, currentPageText;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(' started ', keyword, domain);
            randomUserAgents = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36', 'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'];
            start = appConstants.pageWaitDurationRangeStart, end = appConstants.pageWaitDurationRangeEnd;
            _context.next = 5;
            return puppeteer.launch({
              headless: true
            });

          case 5:
            browser = _context.sent;
            _context.next = 8;
            return browser.newPage();

          case 8:
            page = _context.sent;

            page.setUserAgent(randomUserAgents[getRandomSeconds(0, 8)]);
            _context.next = 12;
            return page.goto('https://www.google.com/ncr');

          case 12:
            _context.next = 14;
            return page.goto(domain);

          case 14:

            page.focus('input[title="Search"]');

            _context.next = 17;
            return page.type(keyword, { delay: getRandomSeconds(100, 200) });

          case 17:
            _context.next = 19;
            return page.$('input[value="Google Search"]');

          case 19:
            submit = _context.sent;
            _context.next = 22;
            return submit.click();

          case 22:
            _context.next = 24;
            return page.waitForNavigation();

          case 24:
            _context.next = 26;
            return page.plainText();

          case 26:
            pageOneText = _context.sent;

            if (!isNull(pageOneText)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt('return', {
              error: true,
              errorMessage: 'Failed to fetch page 1'
            });

          case 29:
            result = Array.from(getUrls(pageOneText));
            index = 1;
            i = index + 1;

          case 32:
            if (!(i <= numberOfPages)) {
              _context.next = 52;
              break;
            }

            selector = 'a[aria-label="Page ' + i + '"]';
            _context.next = 36;
            return page.$(selector);

          case 36:
            nextPageNavigateButton = _context.sent;
            _context.next = 39;
            return page.waitFor(getRandomSeconds(start, end));

          case 39:
            _context.next = 41;
            return nextPageNavigateButton.click();

          case 41:
            _context.next = 43;
            return page.waitForNavigation();

          case 43:
            _context.next = 45;
            return page.plainText();

          case 45:
            currentPageText = _context.sent;

            if (!isNull(currentPageText)) {
              _context.next = 48;
              break;
            }

            return _context.abrupt('return', {
              error: true,
              errorMessage: 'Failed to fetch page ' + i
            });

          case 48:
            result = concat(result, Array.from(getUrls(currentPageText)));

          case 49:
            i++;
            _context.next = 32;
            break;

          case 52:

            browser.close();
            return _context.abrupt('return', {
              success: true,
              result: result
            });

          case 54:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function scrapeGoogleResult(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var puppeteer = require('puppeteer');
var getUrls = require('get-urls');

var times = require('lodash/times');
var concat = require('lodash/concat');
var isNull = require('lodash/isNull');

var getRandomSeconds = require('./getRandomSecondsBetweenRange.js');

var appConstants = require('./appConstants.js');

module.exports = {
  scrapeGoogleResult: scrapeGoogleResult
};
//# sourceMappingURL=index.js.map