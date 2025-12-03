import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

import { buildRouter } from './routes';
import { RouterProvider } from '@tanstack/react-router';

function App() {
  const [router, setRouter] = useState<any>(null)
  
  const [showDevtools, setShowDevtools] = React.useState(false)
  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)

    buildRouter().then(setRouter)
    
  }, [])

  if (!router) return <div>Loading apps...</div>

  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}
      </QueryClientProvider>
  )
}

export default App
