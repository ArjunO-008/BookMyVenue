const Venues = require("../../models/venue");

// POST /venueOwner/venues
// Creates an empty DRAFT venue for the authenticated owner and returns the new
// document's _id so the frontend can immediately redirect to the edit form.
//
// No body fields are required — a DRAFT can exist with no content.
// The owner field is set from req.user._id (populated by authenticate middleware).
//
// TODO:
//   1. Create a new Venues document with { owner: req.user._id } — status and
//      all other fields default from the model (status: "DRAFT", name: "", etc.)
//   2. Return 201 with { data: { _id: venue._id } } so the frontend can navigate
//      to /venue-owner/venues/edit/:id
//   3. On error return 500 with { message: "Failed to create venue" }
async function createOwnerVenue(req, res) {
   // TODO: implement
   return res.status(501).json({ message: "Not implemented" });
}

module.exports = createOwnerVenue;
