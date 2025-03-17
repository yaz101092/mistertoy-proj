import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/main.css'
import {RootCmp} from './RootCmp.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState } from "react";
import { NicePopup } from "./cmps/NicePopup";

export function App() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="app">
            <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>

            {isPopupOpen && (
                <NicePopup
                    heading="My Popup"
                    footing={<button onClick={() => setIsPopupOpen(false)}>Close</button>}
                    onClose={() => setIsPopupOpen(false)}
                >
                    <p>This is a nice popup with content inside.</p>
                </NicePopup>
            )}
        </div>
    );
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootCmp />
  </StrictMode>
)
