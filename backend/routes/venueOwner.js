const express = require("express");
const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const { USER_ROLES } = require("../constants/user");
const listOwnerVenues       = require("../controllers/venue/listOwnerVenues");
const createOwnerVenue      = require("../controllers/venue/createOwnerVenue");
const submitOwnerVenue      = require("../controllers/venue/submitOwnerVenue");
const updateOwnerVenue      = require("../controllers/venue/updateOwnerVenue");
const setVenueVisibility    = require("../controllers/venue/setVenueVisibility");
const deleteOwnerVenue      = require("../controllers/venue/deleteOwnerVenue");

const router = express.Router();

// All routes in this file require a valid venueOwner session.
router.use(authenticate, requireRole(USER_ROLES.VENUE_OWNER));

router.get("/venues",                    listOwnerVenues);
router.post("/venues",                   createOwnerVenue);
router.post("/venues/submit/:id",        submitOwnerVenue);
router.patch("/venues/update/:id",       updateOwnerVenue);
router.patch("/venues/visibility/:id",   setVenueVisibility);
router.delete("/venues/delete/:id",      deleteOwnerVenue);

module.exports = router;
