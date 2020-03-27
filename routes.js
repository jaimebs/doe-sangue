module.exports = (app, db) => {
  app.get('/', (req, res) => {
    const sql = `SELECT * FROM Donors`;
    db.all(sql, [], (error, result) => {
      if (error) return res.send(error.message);
      const donors = result;
      return res.render('index.html', { donors });
    });
  });

  app.post('/', (req, res) => {
    const { name, email, blood } = req.body;

    const sql = `INSERT INTO Donors (name, email, blood) VALUES ($1, $2, $3);`;
    db.run(sql, [name, email, blood], error => {
      if (error) return res.send(error.message);
      return res.redirect('/');
    });
  });
};
