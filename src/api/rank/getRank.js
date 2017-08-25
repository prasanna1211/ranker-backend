export default (db) => (req, res) => {
  db.query('SELECT * FROM ranks', (error, result) => {
    if (error) throw error;
    console.log(res);
    res.json(result);
  });
}
