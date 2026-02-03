import React from "react";

// Wrapper Card
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow rounded border overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

// Card Header
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-4 py-2 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

// Card Title
export const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-gray-800 ${className}`}>{children}</h3>;
};

// Card Content
export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
