import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h2>📊 Dashboard</h2>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </nav>

      <div style={{ marginTop: "20px" }}>
        {/* Nested dashboard routes render here */}
        <Outlet />
      </div>
    </div>
  );
}
