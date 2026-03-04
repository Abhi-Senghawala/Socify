import React from "react";

const AuthLayout = ({ children, title, subtitle, illustration }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex min-h-screen items-center justify-center py-12">
          <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Socify
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                {children}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 rounded-3xl opacity-10 blur-3xl">
                  <img
                    src={
                      illustration ||
                      "https://illustrations.popsy.co/amber/calling.svg"
                    }
                    alt="Signup illustration"
                    className="relative z-10 w-full max-w-md mx-auto"                   
                  />
                  <div className="mt-8 text-center">
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                        Join thousands of creators sharing their stories
                    </p>
                    <div className="flex justify-center gap-4 mt-4">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600"></div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;