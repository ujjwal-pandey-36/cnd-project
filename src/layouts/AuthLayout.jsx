import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Authentication content will be rendered here by Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 