const getRandomSecondsBetweenRange = require('./getRandomSecondsBetweenRange.js');

const PAGE_WAIT_DURATION_RANGE_START = getRandomSecondsBetweenRange(3000, 8000);
const PAGE_WAIT_DURATION_RANGE_END = getRandomSecondsBetweenRange(9000, 20000);
const DELAY_BETWEEN_KEYWORDS = getRandomSecondsBetweenRange(5000, 30000);

module.exports = {
  pageWaitDurationRangeStart: PAGE_WAIT_DURATION_RANGE_START,
  pageWaitDurationRangeEnd: PAGE_WAIT_DURATION_RANGE_END,
  delayBetweenKeywords: DELAY_BETWEEN_KEYWORDS,
};
