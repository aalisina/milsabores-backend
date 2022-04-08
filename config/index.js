const NODE_ENV = process.env.NODE_ENV || 'STAGING';

const config = {
  PRODUCTION: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/production?retryWrites=true&w=majority`,
  },
  STAGING: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/staging?retryWrites=true&w=majority`,
  },
  TEST: {
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`,
  },
};

console.log('Current node environment:', NODE_ENV);
module.exports = config[NODE_ENV];
