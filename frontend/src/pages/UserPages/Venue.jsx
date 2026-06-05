import { useEffect, useState } from "react";
import { getVenues } from "../../services/venue.service.js";
import VenueCard from "../../components/VenueCard.jsx";

export function Venue() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    district: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      district: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    setPage(1);
  };

  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);

        const response = await getVenues(page, filters);

        setVenues(response.data);
        setTotalPages(response.pagination.totalPages);


      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [page, filters]);

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
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">
        Venues
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

        <input
          type="text"
          name="district"
          placeholder="District"
          value={filters.district}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="banquet-hall">Banquet Hall</option>
          <option value="auditorium">Auditorium</option>
          <option value="studio">Studio</option>
          <option value="resort">Resort</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2"
        />

      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="px-4 py-2 border rounded mb-8 hover:bg-gray-100"
      >
        Clear Filters
      </button>

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
    </div>
  );
}