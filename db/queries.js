const pool = require("./pool");

async function getAllUsernames() {
  try {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function insertUsername(username) {
  try {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [
      username,
    ]);
  } catch (err) {
    console.error(err);
  }
}

async function getUsernames(searchQuery) {
  try {
    const result = await pool.query(
      `SELECT * FROM usernames WHERE username ILIKE $1`,
      [`%${searchQuery}%`]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllUsernames,
  insertUsername,
  getUsernames,
};
