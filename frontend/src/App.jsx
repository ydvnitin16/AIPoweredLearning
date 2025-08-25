import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SubjectPage from './pages/SubjectPage.jsx';
import TopicPage from './pages/TopicPage.jsx';
import LandingPage from './pages/LandingPage.jsx'
import RevisionPage from './pages/RevisionPage.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='subject' element={<SubjectPage />} />
                    <Route path='topic' element={<TopicPage />} />
                    <Route path='revision' element={<RevisionPage />} />

                </Route>
            </>
        )
    );

    return (
        <>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
