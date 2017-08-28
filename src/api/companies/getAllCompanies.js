export default (db) => (req, res) => {
  const query = 'SELECT name FROM companies';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
