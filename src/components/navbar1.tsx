import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar1 = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          <img src="/logo.svg" alt="Your Logo" className="h-8" />
        </a>

        {/* Navigation Links (with Dropdown) */}
        <div className="flex space-x-4">
          <Link to={"/login"}><Button>Login</Button></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;