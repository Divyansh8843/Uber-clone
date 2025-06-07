const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
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
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.signinUser
);
router.get("/profile", authMiddleware.authUser, userController.userProfile);
router.get("/logout", authMiddleware.authUser, userController.userLogout);

module.exports = router;
