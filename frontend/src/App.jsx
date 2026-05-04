import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home/Home';
import Jobs from './components/jobs/jobs';
import Browse from './components/browse/Browse';
import Profile from './components/profile/Profile';
import JobDescription from './components/jobs/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetUp from './components/admin/CompanySetUp';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/jobs',
        element: <Jobs/>
    },
    {
        path: '/description/:id',
        element: <JobDescription/>
    },
    {
        path: '/browse',
        element: <Browse/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    // Admin
    {
        path: '/admin/companies',
        element: <Companies/>
    },
    {
        path: '/admin/companies/create',
        element: <CompanyCreate/>
    },
    {
        path: '/admin/companies/:id',
        element: <CompanySetUp/>
    },
    {
        path: '/admin/jobs',
        element: <AdminJobs/>
    },
    {
        path: '/admin/jobs/create',
        element: <PostJob/>
    },
    {
        path: '/admin/jobs/:id/applicants',
        element: <Applicants/>
    },
])

function App() {
    return (
        <>
           <RouterProvider router = {appRouter}/>
        </>
    )
}

export default App;