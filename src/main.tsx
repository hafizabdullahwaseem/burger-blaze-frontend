import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against scripts/extensions attempting to override window.fetch on environments with getter-only fetch
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    const fetchDescriptor = Object.getOwnPropertyDescriptor(window, 'fetch') ||
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');

    // If fetch is getter-only, define a no-op setter so assignments like window.fetch = ... won't throw TypeError
    if (fetchDescriptor && fetchDescriptor.get && !fetchDescriptor.set) {
      try {
        Object.defineProperty(window, 'fetch', {
          get: () => fetchDescriptor.get?.call(window) || originalFetch,
          set: (newFetch) => {
            // Store reference safely without mutating read-only getter
            try {
              (window as any)._customFetch = newFetch;
            } catch {}
          },
          configurable: true,
          enumerable: true,
        });
      } catch {}
    }
  }
} catch {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
