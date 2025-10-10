import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Lazy load React Query DevTools (development only)
const ReactQueryDevtools = lazy(() => import('@tanstack/react-query-devtools').then(d => ({ default: d.ReactQueryDevtools })));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && (
            <Suspense fallback={null}>
                <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
        )}
    </QueryClientProvider>
);
