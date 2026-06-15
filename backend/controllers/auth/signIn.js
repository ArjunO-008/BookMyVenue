const bcrypt = require("bcrypt");
const Users = require("../../models/user");
const { signAuthToken } = require("../../utils/jwt");
const { toPublicUser } = require("./shared");
const { USER_ROLES } = require("../../constants/user");

// Roles permitted to sign in via email/password. Customers sign in with Google
// only, so they are intentionally excluded here. Admin support comes later but
// the role is already accepted.
const SIGN_IN_ROLES = [USER_ROLES.VENUE_OWNER, USER_ROLES.ADMIN];

// Shared response for every failure mode (no such email, wrong password,
// disallowed role, Google-only account). Using one message avoids leaking
// which emails exist or how a given account was created.
const INVALID_CREDENTIALS = "Invalid email or password.";

// POST /auth/signin — email/password sign-in for venue owners and admins.
module.exports.signIn = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email, role: { $in: SIGN_IN_ROLES } });

      // No account, a Google-only account (no password set), or a role that
      // isn't allowed to sign in here — all answered identically.
      if (!user || !user.password) {
         return res.status(401).json({ message: INVALID_CREDENTIALS });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
         return res.status(401).json({ message: INVALID_CREDENTIALS });
      }

      const token = signAuthToken(user);

      return res.status(200).json({
         message: "Logged in successfully",
         data: { token, user: toPublicUser(user) },
      });
   } catch (error) {
      return res.status(500).json({ message: "Sign in failed", error: error.message });
   }
};
