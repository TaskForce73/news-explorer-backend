const {
  NODE_ENV,
  JWT_SECRET = 'super_secret_key',
  MONGO_DB = 'mongodb://localhost:27017/news-explorer',
  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET, MONGO_DB, NODE_ENV, PORT,
};
