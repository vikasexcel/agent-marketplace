import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProblemsPage from "./pages/ProblemsPage";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";

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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
