const express = require("express");
const googleLogin = require("../controllers/auth/googleLogin");
const getMe = require("../controllers/auth/getMe");
const authenticate = require("../middleware/authenticate");
const { signUpDataValidations } = require("../middleware/signUpDataValidations");
const { signInDataValidations } = require("../middleware/signInDataValidations");
const { handleExpressValidatorErrors } = require("../middleware/handleExpressValidatorErrors");
const { venueOwnerSignUp } = require("../controllers/auth/venueOwnerSignUp");
const { signIn } = require("../controllers/auth/signIn");

const router = express.Router();

router.post("/googleLogin", googleLogin);
router.get("/me", authenticate, getMe);

router.post(
   "/venueOwner/signup",
   signUpDataValidations,
   handleExpressValidatorErrors,
   venueOwnerSignUp
);

router.post(
   "/signin",
   signInDataValidations,
   handleExpressValidatorErrors,
   signIn
);

module.exports = router;
