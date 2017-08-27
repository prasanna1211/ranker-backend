export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
    },
  } = req;

  const query = `SELECT r.logDate, r.rank
  FROM ranks r, companies c
  WHERE logDate between '${startDate}' and '${endDate}'
  AND c.name = '${company}'
  ORDER BY r.logDate DESC
  `;
  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
