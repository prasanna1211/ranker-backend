export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
      keyword,
    },
  } = req;

  const query = `SELECT r.id, r.logDate, r.rank
  FROM ranks r, companies c, keywords k
  WHERE logDate between '${startDate}' and '${endDate}'
  AND c.name = '${company}'
  AND k.keyword = '${keyword}'
  AND k.id = r.keywordId
  ORDER BY r.logDate DESC
  `;

  console.log(query);

  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
