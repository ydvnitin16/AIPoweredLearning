import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import { ProtectedUserRoutes } from './components/common/ProtectedRoutes.jsx';
import PageFallback from './components/common/PageFallback.jsx';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const SubjectPage = lazy(() => import('./pages/SubjectPage.jsx'));
const TopicPage = lazy(() => import('./pages/TopicPage.jsx'));
const RevisionPage = lazy(() => import('./pages/RevisionPage.jsx'));
const CreateTopicPage = lazy(() => import('./pages/CreateTopicPage.jsx'));

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/login"
                    element={
                        <ErrorBoundary>
                            <Login />
                        </ErrorBoundary>
                    }
                ></Route>
                <Route
                    path="/signup"
                    element={
                        <ErrorBoundary>
                            <Signup />
                        </ErrorBoundary>
                    }
                ></Route>
                <Route
                    path="/"
                    element={
                        <ErrorBoundary>
                            <MainLayout />
                        </ErrorBoundary>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense fallback={<PageFallback />}>
                                <LandingPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedUserRoutes>
                                <Suspense fallback={<PageFallback />}>
                                    <Dashboard />
                                </Suspense>
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="subject"
                        element={
                            <ProtectedUserRoutes>
                                <Suspense fallback={<PageFallback />}>
                                    <SubjectPage />
                                </Suspense>
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="topic"
                        element={
                            <ProtectedUserRoutes>
                                <Suspense fallback={<PageFallback />}>
                                    <TopicPage />
                                </Suspense>
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="revision"
                        element={
                            <ProtectedUserRoutes>
                                <Suspense fallback={<PageFallback />}>
                                    <RevisionPage />
                                </Suspense>
                            </ProtectedUserRoutes>
                        }
                    />
                    <Route
                        path="create-topic/:subjectId"
                        element={
                            <ProtectedUserRoutes>
                                <Suspense fallback={<PageFallback />}>
                                    <CreateTopicPage />
                                </Suspense>
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
