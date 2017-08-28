export default (db) => (req, res) => {
  const query = 'SELECT id, keyword FROM keywords';
  db.query(query, (error, result) => {
    res.json(result);
  });
}
