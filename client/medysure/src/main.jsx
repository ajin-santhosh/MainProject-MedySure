import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/Theme/theme-provider'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
   <App />
    <Toaster richColors />
    </ThemeProvider>
 
  </StrictMode>,
)
