import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-7xl font-extrabold text-black mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-black/90 hover:shadow-lg transition"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
