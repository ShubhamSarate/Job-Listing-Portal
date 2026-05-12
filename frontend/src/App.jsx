import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import Jobs from "./components/jobs/jobs";
import Browse from "./components/browse/Browse";
import Profile from "./components/profile/Profile";
import JobDescription from "./components/jobs/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import JobSetUp from "./components/admin/JobSetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import SavedJobs from "./components/home/SavedJobs";
import VerifyEmail from "./pages/VerifyEmail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },{
    path: "/saved",
    element: <SavedJobs/>
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path:"/verify-email/:token",
    element: <VerifyEmail/>
  },
  // Admin
  {
  path: "/admin",
  element: <ProtectedRoute />,
  children: [
    {
      path: "companies",
      element: <Companies />
    },
    {
      path: "companies/create",
      element: <CompanyCreate />,
    },
    {
      path: "companies/:id",
      element: <CompanySetUp />,
    },
    {
      path: "job/:id",
      element: <JobSetUp />,
    },
    {
      path: "jobs",
      element: <AdminJobs />,
    },
    {
      path: "jobs/create",
      element: <PostJob />,
    },
    {
      path: "jobs/:id/applicants",
      element: <Applicants />,
    },
  ],
}
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
