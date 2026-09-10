import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './reciever/Main.tsx'
import Login from './Login.tsx'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Main />
    </StrictMode>,
)