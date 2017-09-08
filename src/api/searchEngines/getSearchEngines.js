export default (db) => (req, res) => {
  const query = 'SELECT * FROM searchengines';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
