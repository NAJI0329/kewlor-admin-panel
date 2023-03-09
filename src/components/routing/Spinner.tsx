import React from "react";

const Spinner = () => (
    <div className="w-full h-full dark:bg-white/30 bg-black/20 z-40 fixed left-0 top-0">
        <img
            src="/img/loading-spinner.gif"
            className="absolute w-32 h-32 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] animate-pulse"
            alt="Loading..."
        />
    </div>
);

export default Spinner;
