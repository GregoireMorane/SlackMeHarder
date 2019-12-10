module.exports = {
  pg: {
    url: { ENV: 'DATABASE_URL' },
    overwrite: {
      ssl: process.env.NODE_ENV === 'production',
    },
  },
};
