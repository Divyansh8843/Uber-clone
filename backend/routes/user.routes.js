const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Ivvalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.signinUser
);
// router.get("/logout", userController.logout);

module.exports = router;
