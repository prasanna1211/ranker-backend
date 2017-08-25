export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
    },
  } = req;
  const query = `SELECT rank FROM ranks where logDate between '${startDate}' and '${endDate}'`;
  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
