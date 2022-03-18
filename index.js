/* eslint-disable no-console */
const { api, PORT } = require('./api');

api.listen(PORT, () => console.log(`Listening on ${PORT}`));
