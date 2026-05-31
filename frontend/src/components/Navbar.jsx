import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        {/* Top Row */}
        <div className="flex h-16 items-center gap-3">
          

          {/* Logo */}
          <div className="logo flex items-center gap-2 shrink-0">
            <div className="h-10 w-10 rounded-lg"><img src="/favicon.png" alt="icon" /></div>
            <h1 className="text-lg font-semibold text-gray-900">
              BookMyVenue
            </h1>
          </div>

          {searchOpen && (
            <div className="pb-3 md:hidden">
              <input
                type="text"
                placeholder="Search venues..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-red-500"
              />
            </div>
          )}

          {/* Desktop Search */}
          <div className="searchbar hidden flex-1 px-4 md:block">
            <input
              type="text"
              placeholder="Search venues, cafes, auditoriums..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-red-500"
            />
          </div>

          {/* Desktop Nav */}
          <div className="navlinks hidden items-center gap-2 md:flex">

            <button className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:border-red-500 hover:text-red-600">
              <span>📍</span>
              <span>Ernakulam</span>
              <span className="text-xs">▼</span>
            </button>

            <button className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Venue
            </button>

            <button className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Category
            </button>

            <button className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Host
            </button>

            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              Sign In
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="ml-auto flex items-center gap-2 md:hidden">

            <button className="p-2 text-gray-600"
              onClick={() => setSearchOpen((e) => !e)}
            >
              🔍
            </button>

            <button className="p-2 text-gray-600"
              onClick={() => setMenuOpen((e) => !e)}
            >
              ☰
            </button>

            <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white">
              Sign In
            </button>
          </div>

        </div>

        {/* Mobile Location Row */}
        <div className="pb-3 md:hidden">
          <button className="text-sm font-medium text-red-600 hover:text-red-700">
            📍 Ernakulam ▼
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 py-2 md:hidden">

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              Venue
            </button>

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              Category
            </button>

            <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              Host
            </button>

          </div>
        )}

      </div>
    </nav>
  )
}

