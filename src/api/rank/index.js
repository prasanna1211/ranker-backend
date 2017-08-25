module.exports = {
  getRank: (req, res) => {
    res.json({
      rank: 1,
    });
  },
  getRanks: (req, res) => {
    res.json({
      rank: [1, 2],
    })
  }
}
