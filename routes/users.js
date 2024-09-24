const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

/* GET users listing. */
usersRouter.get("/", usersController.usersListGet);

/* GET form to add user */
usersRouter.get("/new", usersController.createUserGet);

/* POST user data to db" */
usersRouter.post("/new", usersController.createUserPost);

/* GET form to search for a user */
usersRouter.get("/find-user", usersController.userSearchGet);

/* GET form to delete a user */
usersRouter.get("/delete", usersController.deleteFormGet);

/* POST route to delete a user */
usersRouter.post("/delete", usersController.deleteUserPost);

module.exports = usersRouter;
