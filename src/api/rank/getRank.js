export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
      keyword,
    },
  } = req;

  const query = `SELECT r.logDate, r.rank
  FROM ranks r, companies c, keywords k
  WHERE logDate between '${startDate}' and '${endDate}'
  AND c.name = '${company}'
  AND k.keyword = '${keyword}'
  ORDER BY r.logDate DESC
  `;

  console.log(query);

  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
