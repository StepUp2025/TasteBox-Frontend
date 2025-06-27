import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProviders } from 'app/themeProvider'
import { queryClient } from 'shared/lib/queryClient'
import { Routers } from './Routers'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviders>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ThemeProviders>
    </QueryClientProvider>
  );
}

export default App
