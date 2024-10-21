import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ admin, children }) {
    if (!admin || !admin.userRoleId.includes("Admin")) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;
