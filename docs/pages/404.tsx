import React from "react";
import { Navigate } from "react-router-dom";

const Component404 = () => {
  return (
    <div className="container flex items-center justify-center">
      <h2>404</h2>
      <p>
        Not found. go back to{" "}
        <button onClick={() => Navigate({ to: "/" })}>Home</button>
      </p>
    </div>
  );
};

export default Component404;
