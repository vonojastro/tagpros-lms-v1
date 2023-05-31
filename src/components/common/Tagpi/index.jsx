import React from "react";
import "./index.css";

export default function Tagpi({ type, customMessage, dataName, showSpinner, reload }) {
    const illustrations = {
        loading: {
            src: './assets/illustrations/Preloader.gif',
            message: `Please wait while ${dataName ? dataName : 'data'} are loading...`
        },
        404: {
            src: './assets/illustrations/404-final-03.png',
            message: 'Uh Oh! The resource you are looking for does not exist.'
        },
        noData: {
            src: './assets/illustrations/no-data-06.png',
            message: `No ${dataName ? dataName : 'data'} available.`
        },
        505: {
            src: './assets/images/tarsier-v2a.png',
            message: `Uh Oh! There was an error loading the ${dataName ? dataName : 'data'}. Please make sure you
                are connected to the Internet or try refreshing the page.`
        },
        default: {
            src: './assets/images/tarsier-v2a.png',
            message: ''
        }
    }

    return (
        <div className="tagpi-container d-flex flex-column align-items-center">
            <img src={!!type ? illustrations[type].src : illustrations.default.src} alt={type} />
            <span>
                {showSpinner && <span className="spinner-border spinner-border-sm btn-load" role="status"></span>}
                {!!customMessage ? customMessage : illustrations[type].message}
            </span>
            {reload && <button className="btn btn-outline-secondary mt-3" onClick={reload}>Reload</button>}
        </div>
    );
}