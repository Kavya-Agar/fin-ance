import React from "react";

export default function SubmitTransaction() {
    return (
         <div className="nav-actions hidden md:flex">
        <button
          className="action-btn black flex items-center justify-center bg-orange-200 rounded"
          style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          🎣 Save
        </button>
      </div>
    )
};