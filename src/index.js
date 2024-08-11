import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 1 } } });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
);


