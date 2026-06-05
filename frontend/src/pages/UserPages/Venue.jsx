import { useEffect, useState } from "react";
import { getVenues } from "../../services/venue.service.js";
import VenueCard from "../../components/VenueCard.jsx";
import VenueFilterModal from "../../components/VenueFilterModal.jsx"

export function Venue() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    district: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });



  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);

        const response = await getVenues(page, appliedFilters);
        setVenues(response.data);
        setTotalPages(response.pagination.totalPages);


      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [page, appliedFilters]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Venues</h1>
        <p>Loading venues...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Venues
        </h1>

        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Filter
        </button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-6">

        {appliedFilters.category && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {appliedFilters.category}
          </span>
        )}

        {appliedFilters.minPrice !== "" && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            ₹{appliedFilters.minPrice}
            {appliedFilters.maxPrice
              ? ` - ₹${appliedFilters.maxPrice}`
              : "+"}
          </span>
        )}

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard
            key={venue._id}
            venue={venue}
          />
        ))}
      </div>

      {/* Empty State */}
      {!loading && venues.length === 0 && (
        <div className="text-center py-10">
          No venues found.
        </div>
      )}

      {/* Pagination */}
      {venues.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      {/* Filter Modal */}
      <VenueFilterModal
        key={String(open)}
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        appliedFilters={appliedFilters}
        onApply={(filters) => {
          setAppliedFilters(filters);
          setPage(1);
        }}
      />

    </div>
  );
}