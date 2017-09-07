export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
      domain,
    },
  } = req;

  const query = `SELECT r.rank, r.companyId, r.logDate, k.keyword, d.domain
   FROM ranks r
   INNER JOIN keywords k ON r.keywordId = k.id
   INNER JOIN domains d ON k.domain_id = d.id
   WHERE domain = "${domain}"
   AND logDate between '${startDate}' and '${endDate}'
   ORDER BY logDate
   `;

  //WHERE
  console.log(query);

  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
