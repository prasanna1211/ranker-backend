export default (db) => (req, res) => {
  const query = 'SELECT id, domain, category FROM domains';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
