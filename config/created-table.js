module.exports = db => {
  const sql_create = `CREATE TABLE IF NOT EXISTS Donors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        blood VARCHAR(10) NOT NULL
      );`;

  db.run(sql_create, err => {
    if (err) {
      return console.error(err.message);
    }
    // console.log("Successful creation of the 'Donors' table");
  });
};
