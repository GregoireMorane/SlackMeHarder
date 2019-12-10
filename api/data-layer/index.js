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

const storeMessage = async (content, channelId, userId) => {
  try {
    const message = await pool.query(
      `INSERT INTO message (content,channel_id, app_user_id) VALUES ($1, $2, $3) RETURNING *`,
      [content, channelId, userId]
    );
    return message.rows[0];
  } catch (error) {
    console.log('error : ', error);
  }
};

const getMessageByChannel = async id => {
  try {
    const messagesList = await pool.query(
      `SELECT message.*, app_user.username
      FROM message
      LEFT JOIN app_user
      ON message.app_user_id = app_user.id
      WHERE message.channel_id = $1`,
      [id]
    );
    return messagesList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

const createUser = async (username, password) => {
  try {
    await pool.query(
      `INSERT INTO app_user (username, password) VALUES ($1, crypt($2, gen_salt('bf')))`,
      [username, password]
    );
  } catch (error) {
    console.log('error: ', error);
  }
};

const findUserByUsername = async username => {
  try {
    const queryResult = await pool.query(
      `SELECT * from app_user WHERE username = $1`,
      [username]
    );
    return queryResult.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

const findUserById = async id => {
  try {
    const queryResult = await pool.query(
      `SELECT * from app_user WHERE id = $1`,
      [id]
    );
    return queryResult.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

const verifyUser = async (username, password) => {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM app_user WHERE username=$1 AND password = crypt($2,password)`,
      [username, password]
    );
    return queryResult.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

const createSession = async (sessionId, user_id) => {
  try {
    const user = await pool.query(
      `INSERT INTO user_session (sessionId, user_id) VALUES ($1, $2)`,
      [sessionId, user_id]
    );
    return user.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

const updateSession = async (sessionId, user_id) => {
  try {
    await pool.query(
      `UPDATE user_session SET user_id = $1 WHERE sessionId = $2`,
      [user_id, sessionId]
    );
  } catch (error) {
    console.log('error: ', error);
  }
};

const findSessionById = async sessionId => {
  try {
    const session = await pool.query(
      `SELECT * FROM user_session WHERE sessionId=$1`,
      [sessionId]
    );
    return session.rows[0];
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = {
  createChannel,
  getChannels,
  storeMessage,
  getMessageByChannel,
  createUser,
  findUserByUsername,
  findUserById,
  verifyUser,
  createSession,
  findSessionById,
  updateSession,
};
