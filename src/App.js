import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TestSuitsList } from './components/core/TestSuitsList';
import './styles.css';
import { EditFormModal } from './components/core/EditFormModal';
import { useRef } from 'react';

function App() {
  const { current: queryClient } = useRef(new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TestSuitsList />
        <EditFormModal />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
