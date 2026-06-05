import { useState } from "react";

export default function VenueFilterModal({
  open,
  onClose,
  appliedFilters,
  onApply,
}) {
  const [activeSection, setActiveSection] = useState("category");

  const [tempFilters, setTempFilters] = useState(appliedFilters);


  const CATEGORIES = [
    {
      label: "Banquet Hall",
      value: "banquet-hall",
    },
    {
      label: "Auditorium",
      value: "auditorium",
    },
    {
      label: "Studio",
      value: "studio",
    },
    {
      label: "Resort",
      value: "resort",
    },
  ];

  const PRICE_RANGES = [
    {
      label: "< ₹45K",
      minPrice: "",
      maxPrice: 45000,
    },
    {
      label: "₹45K - ₹60K",
      minPrice: 45000,
      maxPrice: 60000,
    },
    {
      label: "₹60K - ₹100K",
      minPrice: 60000,
      maxPrice: 100000,
    },
    {
      label: "₹100K+",
      minPrice: 100000,
      maxPrice: "",
    },
  ];

  const clearFilters = () => {
    setTempFilters({
      district: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-[700px] h-[450px] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Filters
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex h-[320px]">

          {/* Left Menu */}
          <div className="w-1/3 border-r">

            <button
              onClick={() => setActiveSection("category")}
              className={`w-full text-left p-4 ${
                activeSection === "category"
                  ? "bg-gray-100 font-medium"
                  : ""
              }`}
            >
              Category
            </button>

            <button
              onClick={() => setActiveSection("price")}
              className={`w-full text-left p-4 ${
                activeSection === "price"
                  ? "bg-gray-100 font-medium"
                  : ""
              }`}
            >
              Price
            </button>

          </div>

          {/* Right Side */}
          <div className="flex-1 p-5">

            {activeSection === "category" && (
              <div className="flex flex-wrap gap-3">

                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        category: category.value,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg border transition ${
                      tempFilters.category === category.value
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}

              </div>
            )}

            {activeSection === "price" && (
              <div className="flex flex-wrap gap-3">

                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        minPrice: range.minPrice,
                        maxPrice: range.maxPrice,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg border transition ${
                      tempFilters.minPrice === range.minPrice &&
                      tempFilters.maxPrice === range.maxPrice
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3">

          <button
            onClick={clearFilters}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Clear
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Apply Filters
          </button>

        </div>

      </div>

    </div>
  );
}