import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SnackbarProvider } from 'notistack';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
  <App />
</SnackbarProvider>,
)
