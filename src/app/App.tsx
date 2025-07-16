import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProviders } from 'app/themeProvider';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from 'shared/lib/queryClient';
import ScrollToTop from 'shared/ui/ScrollToTop/ScrollToTop';
import { AuthProvider } from './AuthProvider';
import { Routers } from './Routers';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviders>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routers />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProviders>
    </QueryClientProvider>
  );
}

export default App;
