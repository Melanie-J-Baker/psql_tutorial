const db = require("../db/queries");

async function usersListGet(req, res) {
  try {
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.render("index", {
      title: "Usernames: ",
      users: usernames,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      error: err,
    });
  }
}

async function createUserGet(req, res) {
  // Render HTML form with 1 username input text field which submits to next route
  res.render("createUser", {
    title: "Create user",
  });
}

async function createUserPost(req, res) {
  try {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      error: err,
    });
  }
}

async function userSearchGet(req, res) {
  const searchQuery = req.query.search || "";
  let users = [];
  try {
    if (searchQuery) {
      const result = await db.getUsernames(searchQuery);
      users = result.rows;
    }
    // Render EJS template with users array
    res.render("search", {
      title: `Users found:  ${users.length}`,
      users: users,
      searchQuery: searchQuery,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      error: err,
    });
  }
}

async function deleteFormGet(req, res) {
  // Render HTML form with 1 username input text field which submits to next route
  res.render("deleteUser", {
    title: "Delete user",
  });
}

async function deleteUserPost(req, res) {
  try {
    const { username } = req.body;
    console.log(username);
    if (username) {
      await db.deleteUser(username);
      res.render("userDeleted", {
        user: username,
      });
    } else {
      res.render("userDeleted", {
        user: "None provided!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      error: err,
    });
  }
}

module.exports = {
  usersListGet,
  createUserGet,
  createUserPost,
  userSearchGet,
  deleteFormGet,
  deleteUserPost,
};
