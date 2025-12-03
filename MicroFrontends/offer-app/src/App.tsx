import Box from 'HostApp/Box';
import './App.css';
import { Link, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Box width={'100%'}>
        <Box>
          <h2>Welcome in Offer App </h2>
          <nav>
            <Link to="/main/user">Back to App1</Link>
          </nav>
        </Box>
        <Outlet /> 
      </Box>
    </QueryClientProvider>
  )
}

export default App
