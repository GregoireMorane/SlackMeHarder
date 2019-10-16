const pg = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const createChannel = async name => {
  try {
    await pool.query(`INSERT INTO channel (name) VALUES ($1)`, [name]);
  } catch (error) {
    console.log('error: ', error);
  }
};

const getChannels = async () => {
  try {
    const channelList = await pool.query(`SELECT * from channel`);
    return channelList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

const storeMessage = async (content, channelId) => {
  try {
    await pool.query(
      `INSERT INTO message (content,channel_id) VALUES ($1, $2)`,
      [content, channelId]
    );
  } catch (error) {
    console.log('error : ', error);
  }
};

module.exports = {
  createChannel,
  getChannels,
  storeMessage,
};
