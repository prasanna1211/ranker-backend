export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
      domain,
    },
  } = req;
  const ifCompanyExistQuery = company ? `AND cn.name = "${company}"` : '';
  const ifDateExistQuery = startDate || endDate ? `AND logDate between '${startDate}' and '${endDate}'` : ``;

  const query = `SELECT r.rank, cn.name, r.logDate, k.keyword, d.domain
   FROM ranks r
   INNER JOIN keywords k ON r.keywordId = k.id
   INNER JOIN domains d ON k.domain_id = d.id
   INNER JOIN companynames cn ON cn.id = companyId ${ifCompanyExistQuery}
   WHERE domain = "${domain}"
   ${ifDateExistQuery}
   ORDER BY logDate
   `;

  //WHERE
  console.log(query);

  db.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
}
