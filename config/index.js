const NODE_ENV = process.env.NODE_ENV || 'STAGING';

const config = {
  PRODUCTION: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vlobk.mongodb.net/production?retryWrites=true&w=majority`,
  },
  STAGING: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vlobk.mongodb.net/staging?retryWrites=true&w=majority`,
  },
  TEST: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vlobk.mongodb.net/test?retryWrites=true&w=majority`,
  },
};

// eslint-disable-next-line no-console
console.log('NODE_ENV', NODE_ENV);
module.exports = config[NODE_ENV];
