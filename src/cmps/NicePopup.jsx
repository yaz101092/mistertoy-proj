import { useEffect } from "react";
import PropTypes from "prop-types";

export function NicePopup({ heading, children, footing, onClose }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") onClose(); // סגירה בלחיצה על ESC
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <header className="popup-header">
                    <h2>{heading}</h2>
                    {/* <button className="close-btn" onClick={onClose}>✖</button> */}
                </header>
                <main className="popup-main">{children}</main>
                <footer className="popup-footer">{footing}</footer>
            </div>
        </div>
    );
}

NicePopup.propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footing: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};
