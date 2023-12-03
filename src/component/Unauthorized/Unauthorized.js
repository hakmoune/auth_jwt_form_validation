import React from "react";
import './unauthorized.css';

const Unauthorized = () => {
    return (
        <div>
            <h3 className="home-title">This page is accesible only for user connected but not have the role Admin</h3>
        </div>
    )
}

export default Unauthorized;