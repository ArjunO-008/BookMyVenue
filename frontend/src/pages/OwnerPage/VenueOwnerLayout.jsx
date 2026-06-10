import { Outlet } from "react-router-dom";
import VenueOwnerNavbar from "../../components/venueOwner/VenueOwnerNavbar.jsx";

// Shared chrome for venue-owner routes that show the navbar (e.g. /venue-owner/home).
// The login route is rendered outside this layout.
export function VenueOwnerLayout() {
  return (
    <div className="min-h-screen flex">
      <VenueOwnerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
