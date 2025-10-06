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
import LandingPage from './pages/LandingPage.jsx';
import RevisionPage from './pages/RevisionPage.jsx';
import CreateTopicPage from './pages/CreateTopicPage.jsx';
import NotFound from './pages/NotFound.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import { ProtectedUserRoutes } from './components/common/ProtectedRoutes.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route
                    path="/"
                    element={
                        <ErrorBoundary>
                            <MainLayout />
                        </ErrorBoundary>
                    }
                >
                    <Route index element={<LandingPage />} />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedUserRoutes>
                                <Dashboard />
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="subject"
                        element={
                            <ProtectedUserRoutes>
                                <SubjectPage />
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="topic"
                        element={
                            <ProtectedUserRoutes>
                                <TopicPage />
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="revision"
                        element={
                            <ProtectedUserRoutes>
                                <RevisionPage />
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="create-topic/:subjectId"
                        element={
                            <ProtectedUserRoutes>
                                <CreateTopicPage />
                            </ProtectedUserRoutes>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
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
