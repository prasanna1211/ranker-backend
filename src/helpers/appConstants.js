const getRandomSecondsBetweenRange = require('./getRandomSecondsBetweenRange.js');

const PAGE_WAIT_DURATION_RANGE_START = getRandomSecondsBetweenRange(4000, 15000);
const PAGE_WAIT_DURATION_RANGE_END = getRandomSecondsBetweenRange(18000, 30000);
const DELAY_BETWEEN_KEYWORDS = getRandomSecondsBetweenRange(50000, 100000);

module.exports = {
  pageWaitDurationRangeStart: PAGE_WAIT_DURATION_RANGE_START,
  pageWaitDurationRangeEnd: PAGE_WAIT_DURATION_RANGE_END,
  delayBetweenKeywords: DELAY_BETWEEN_KEYWORDS,
};
