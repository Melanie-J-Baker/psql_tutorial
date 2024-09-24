const pool = require("./pool");

async function getAllUsernames() {
  try {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
  } catch (err) {
    throw err;
  }
}

async function insertUsername(username) {
  try {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [
      username,
    ]);
  } catch (err) {
    throw err;
  }
}

async function getUsernames(searchQuery) {
  try {
    const result = await pool.query(
      `SELECT * FROM usernames WHERE username ILIKE $1`,
      [`%${searchQuery}%`]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function deleteUser(username) {
  if (!username || typeof username !== "string") {
    throw new Error("Invalid username");
  }

  try {
    const result = await pool.query(
      "DELETE FROM usernames WHERE username = $1",
      [username.trim()]
    );
    if (result.rowCount === 0) {
      // No user deleted
      throw new Error("No user found with given username");
    }
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllUsernames,
  insertUsername,
  getUsernames,
  deleteUser,
};
