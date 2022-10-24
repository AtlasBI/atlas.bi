export default () => ({
  database: {
    url: process.env.ROOT_MONGO_URI,
    name: process.env.ROOT_MONGO_NAME,
  },
});