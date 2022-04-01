const app = require('../app');
const mongoose = require('mongoose');

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Connection to MongoDB established successfully`);
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
