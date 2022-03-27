/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { api, PORT } = require('./api');
const { MONGO_URI } = require('./config');

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error occured while trying to connect to DB', err));

api.listen(PORT, () => console.log(`Listening on ${PORT}`));
