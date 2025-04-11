
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-agro-beige/50">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-agro-darkGreen">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you're looking for could not be found
        </p>
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-32 w-32 mx-auto opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-agro-green"
            >
              <path d="M22 8.5c0 1.5-.5 3-2 4 1.5 1 2 2.5 2 4s-1.5 3-3 3c.5-1.5.5-3-.5-4-1 1-2 1.5-3.5 1.5s-2.5-.5-3.5-1.5c-1 1-1 2.5-.5 4-1.5 0-3-1.5-3-3s.5-3 2-4c-1.5-1-2-2.5-2-4s1.5-3 3-3c-.5 1.5-.5 3 .5 4 1-1 2-1.5 3.5-1.5s2.5.5 3.5 1.5c1-1 1-2.5.5-4 1.5 0 3 1.5 3 3z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
        </div>
        <Button asChild className="bg-agro-green hover:bg-agro-darkGreen">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
