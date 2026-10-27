import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { Store } from './Store/Store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="478021921235-kh9uvben118bmp9fpc9mdd80jktnk9m8.apps.googleusercontent.com">
      <Provider store={Store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
