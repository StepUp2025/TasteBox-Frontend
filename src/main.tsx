import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'shared/ui/Toast/Toast.tsx';
import App from './app/App.tsx';
import { startMockWorker } from './app/mockWorker.ts';

startMockWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Toaster />
      <App />
    </StrictMode>,
  );
});
