import React from 'react';
import './index.css';

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="screen-wrapper">
            <video className="background-video w-[100vw] h-[100vh] object-cover z-0 opacity-80" autoPlay muted loop>
                <source src="/assets/video/red.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Yellow overlay for color tinting */}
            <div className="overlay"></div>
            <div className="content z-10">
                {children}
            </div>
        </div>
    );
}
