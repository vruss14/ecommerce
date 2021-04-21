const express = require('express');
const routes = require('./routes');
// Imports the sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Syncs the Sequelize models to the database, then turns on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
