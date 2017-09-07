export default (db) => (req, res) => {
  const query = 'SELECT * from companynames';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
