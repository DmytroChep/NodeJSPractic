const express = require("express")
const userController = require('./user.controller')

const router = express.Router()

router.get("/users", userController.getAllUsers)
router.get("/user/:id", userController.getUserFields)


module.exports = router