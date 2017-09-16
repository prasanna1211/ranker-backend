'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var scrapeGoogleResult = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(keyword, domain, numberOfPages) {
    var randomUserAgents, start, end, browser, page, submit, pageOneText, result, index, i, selector, nextPageNavigateButton, currentPageText;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(' started ', keyword, domain);
            randomUserAgents = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36', 'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'];
            start = appConstants.pageWaitDurationRangeStart, end = appConstants.pageWaitDurationRangeEnd;
            _context.prev = 3;
            _context.next = 6;
            return puppeteer.launch({
              headless: true
            });

          case 6:
            browser = _context.sent;
            _context.next = 9;
            return browser.newPage();

          case 9:
            page = _context.sent;

            page.setUserAgent(randomUserAgents[getRandomSeconds(0, 8)]);
            _context.next = 13;
            return page.goto('https://www.google.com/ncr', {
              timeout: 60000
            });

          case 13:
            _context.next = 15;
            return page.goto(domain);

          case 15:

            page.focus('input[title="Search"]');

            _context.next = 18;
            return page.type(keyword, { delay: getRandomSeconds(100, 500) });

          case 18:
            _context.next = 20;
            return page.$('input[value="Google Search"]');

          case 20:
            submit = _context.sent;
            _context.next = 23;
            return submit.click();

          case 23:
            _context.next = 25;
            return page.waitForNavigation();

          case 25:
            _context.next = 27;
            return page.plainText();

          case 27:
            pageOneText = _context.sent;

            if (!isNull(pageOneText)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('return', {
              error: true,
              errorMessage: 'Failed to fetch page 1'
            });

          case 30:
            result = Array.from(getUrls(pageOneText));
            index = 1;
            i = index + 1;

          case 33:
            if (!(i <= numberOfPages)) {
              _context.next = 53;
              break;
            }

            selector = 'a[aria-label="Page ' + i + '"]';
            _context.next = 37;
            return page.$(selector);

          case 37:
            nextPageNavigateButton = _context.sent;
            _context.next = 40;
            return page.waitFor(getRandomSeconds(start, end));

          case 40:
            _context.next = 42;
            return nextPageNavigateButton.click();

          case 42:
            _context.next = 44;
            return page.waitForNavigation();

          case 44:
            _context.next = 46;
            return page.plainText();

          case 46:
            currentPageText = _context.sent;

            if (!isNull(currentPageText)) {
              _context.next = 49;
              break;
            }

            return _context.abrupt('return', {
              error: true,
              errorMessage: 'Failed to fetch page ' + i
            });

          case 49:
            result = concat(result, Array.from(getUrls(currentPageText)));

          case 50:
            i++;
            _context.next = 33;
            break;

          case 53:
            _context.next = 55;
            return page.close();

          case 55:
            browser.close();
            return _context.abrupt('return', {
              success: true,
              result: result
            });

          case 59:
            _context.prev = 59;
            _context.t0 = _context['catch'](3);
            throw new Error('Error occured ' + _context.t0);

          case 62:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 59]]);
  }));

  return function scrapeGoogleResult(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=getGoogleResult.js.map