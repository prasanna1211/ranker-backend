export default (db) => (req, res) => {
  const query = 'SELECT id, name FROM companies';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
