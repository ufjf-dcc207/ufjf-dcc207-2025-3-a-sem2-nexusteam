import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilos/index.css'
import App from './App.tsx'
import Rodape from './Rodape.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createRoot(document.getElementById('rodape')!).render(
  <StrictMode>
    <Rodape />
  </StrictMode>,
)