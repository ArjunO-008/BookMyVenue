// frontend/src/pages/VenueOwnerPage/VenueOwnerAnalytics.jsx
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Building2,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ─── Hardcoded data ──────────────────────────────────────────────────────────

const VENUE_REVENUE = [
  { id: "v1", name: "Royal Grand Hall", category: "Banquet Hall", bookings: 18, revenue: 845000, trend: 12.4 },
  { id: "v2", name: "Backwater Resort", category: "Resort", bookings: 9, revenue: 1120000, trend: 8.1 },
  { id: "v3", name: "The Garden Café", category: "Café", bookings: 32, revenue: 312000, trend: -4.2 },
  { id: "v4", name: "Skyline Auditorium", category: "Auditorium", bookings: 6, revenue: 690000, trend: 21.7 },
];

const MONTHLY_TREND = [
  { month: "Jan", value: 210000 },
  { month: "Feb", value: 245000 },
  { month: "Mar", value: 198000 },
  { month: "Apr", value: 287000 },
  { month: "May", value: 320000 },
  { month: "Jun", value: 365000 },
];

const totalRevenue = VENUE_REVENUE.reduce((s, v) => s + v.revenue, 0);
const totalBookings = VENUE_REVENUE.reduce((s, v) => s + v.bookings, 0);
const mostProfitable = [...VENUE_REVENUE].sort((a, b) => b.revenue - a.revenue)[0];
const avgBookingValue = Math.round(totalRevenue / totalBookings);

// ─── Stat card ───────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, title, value, sub, iconBg, iconColor }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className={`rounded-lg p-2 ${iconBg} ${iconColor}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <p className="mt-4 text-3xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

// ─── Simple bar chart (pure CSS, no chart lib) ──────────────────────────────

function RevenueTrendChart() {
  const max = Math.max(...MONTHLY_TREND.map((m) => m.value));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <span className="text-xs text-gray-400">Last 6 months</span>
      </div>

      <div className="flex h-48 items-end gap-4">
        {MONTHLY_TREND.map((m) => {
          const heightPct = (m.value / max) * 100;
          const isLast = m.month === MONTHLY_TREND[MONTHLY_TREND.length - 1].month;
          return (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                ₹{(m.value / 1000).toFixed(0)}K
              </span>
              <div className="flex h-36 w-full items-end">
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-md transition-all ${
                    isLast ? "bg-red-600" : "bg-red-200"
                  }`}
                />
              </div>
              <span className="text-xs text-gray-400">{m.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Venue revenue list/table ────────────────────────────────────────────────

function VenueRevenueTable() {
  const [sortBy, setSortBy] = useState("revenue");

  const sorted = [...VENUE_REVENUE].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxRevenue = Math.max(...VENUE_REVENUE.map((v) => v.revenue));

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900">Revenue by Venue</h3>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 text-xs">
          {[
            { key: "revenue", label: "Revenue" },
            { key: "bookings", label: "Bookings" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`rounded-md px-3 py-1 font-medium transition ${
                sortBy === opt.key
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {sorted.map((v) => {
          const widthPct = (v.revenue / maxRevenue) * 100;
          const isUp = v.trend >= 0;

          return (
            <div key={v.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.category} · {v.bookings} bookings</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      isUp ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(v.trend)}%
                  </span>
                  <span className="w-24 text-right text-sm font-bold text-gray-900">
                    ₹{v.revenue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  style={{ width: `${widthPct}%` }}
                  className="h-2 rounded-full bg-red-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Category breakdown ──────────────────────────────────────────────────────

function CategoryBreakdown() {
  const byCategory = VENUE_REVENUE.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + v.revenue;
    return acc;
  }, {});
  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-gray-900">Revenue by Category</h3>
      <div className="space-y-4">
        {entries.map(([category, value], i) => {
          const pct = Math.round((value / totalRevenue) * 100);
          return (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{category}</span>
                <span className="text-gray-400">{pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  style={{ width: `${pct}%` }}
                  className={`h-2 rounded-full ${colors[i % colors.length]}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function VenueOwnerAnalytics() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          See how your venues are performing and where your revenue is coming from.
        </p>
      </section>

      {/* Stat cards — max 4 */}
      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Wallet}
            title="Total Revenue"
            value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
            sub="All venues, all time"
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Most Profitable Venue"
            value={mostProfitable.name}
            sub={`₹${mostProfitable.revenue.toLocaleString()} earned`}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
          <StatCard
            icon={CalendarCheck}
            title="Total Bookings"
            value={totalBookings}
            sub="Across all venues"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={Building2}
            title="Avg. Booking Value"
            value={`₹${avgBookingValue.toLocaleString()}`}
            sub="Per confirmed booking"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>
      </section>

      {/* Trend + category */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <RevenueTrendChart />
        <CategoryBreakdown />
      </section>

      {/* Venue revenue list */}
      <section>
        <VenueRevenueTable />
      </section>
    </div>
  );
}