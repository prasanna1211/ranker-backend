const getRandomSecondsBetweenRange = require('./getRandomSecondsBetweenRange.js');

const PAGE_WAIT_DURATION_RANGE_START = getRandomSecondsBetweenRange(2000, 2500);
const PAGE_WAIT_DURATION_RANGE_END = getRandomSecondsBetweenRange(3500, 5000);
const DELAY_BETWEEN_KEYWORDS = getRandomSecondsBetweenRange(4000-9000);

module.exports = {
  pageWaitDurationRangeStart: PAGE_WAIT_DURATION_RANGE_START,
  pageWaitDurationRangeEnd: PAGE_WAIT_DURATION_RANGE_END,
  delayBetweenKeywords: DELAY_BETWEEN_KEYWORDS,
};
