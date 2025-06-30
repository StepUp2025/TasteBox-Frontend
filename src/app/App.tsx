import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProviders } from "app/themeProvider";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "shared/lib/queryClient";
import { AuthProvider } from "./AuthProvider";
import { Routers } from "./Routers";

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProviders>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </ThemeProviders>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
