import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default ProtectedRoute;