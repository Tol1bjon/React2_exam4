import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { Store } from './Store/Store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1020064061370-01nv7rjj02nnthc2ti5mbk20mro8ejm0.apps.googleusercontent.com">
      <Provider store={Store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
