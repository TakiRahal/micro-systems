import { Link, Outlet } from '@tanstack/react-router';
import './App.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';
import Box from 'HostApp/Box';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box width={'100%'}>
        <Box>
          <h2>- App1 Layout - </h2>
          <nav>
            <Link to="/main/user">Go to App1</Link>
            <br />
            <Link to="/main/user/list">List Users</Link>
            <br />
            <Link to="/main/user/details">Details</Link>
            <br />
            <Link to="/main/offer">Go to App2</Link>
          </nav>
        </Box>
        <Outlet />
      </Box>
      </QueryClientProvider>
  )
}

export default App
