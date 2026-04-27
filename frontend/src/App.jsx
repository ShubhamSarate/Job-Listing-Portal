import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home/Home';
import { Toaster } from "sonner";
import Jobs from './components/jobs/jobs';
import Browse from './components/browse/Browse';
import Profile from './components/profile/Profile';
import JobDescription from './components/jobs/JobDescription';

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
    }
])

function App() {
    return (
        <>
           <RouterProvider router = {appRouter}/>
        </>
    )
}

export default App;