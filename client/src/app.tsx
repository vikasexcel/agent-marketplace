import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProblemsPage from "./pages/ProblemsPage";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "problems",
        element: <ProblemsPage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // Placeholder routes for dashboard sub-pages
      { path: "jobs", element: <Dashboard /> },
      { path: "jobs/new", element: <Dashboard /> },
      { path: "jobs/:id", element: <Dashboard /> },
      { path: "negotiations", element: <Dashboard /> },
      { path: "negotiations/:id", element: <Dashboard /> },
      { path: "wallet", element: <Dashboard /> },
      { path: "notifications", element: <Dashboard /> },
      { path: "opportunities", element: <Dashboard /> },
      { path: "opportunities/:id", element: <Dashboard /> },
      { path: "inventory", element: <Dashboard /> },
      { path: "inventory/new", element: <Dashboard /> },
      { path: "inventory/:id", element: <Dashboard /> },
      { path: "settings", element: <Dashboard /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
