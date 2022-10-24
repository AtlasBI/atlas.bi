export default () => ({
  database: {
    url: process.env.APP_MONGO_URI,
    name: process.env.APP_MONGO_NAME,
  },
});