import { Link } from 'react-router-dom';
import { Button } from './ui/button';



const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className='sticky top-0 z-50 bg-white border-b bg-opacity-60 pt-1 px-3 w-full'>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          <img src="/logo.png" alt="Your Logo" className="h-20 -bottom-10" />
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to={"/contact"}><Button>Contact us</Button></Link>
          {isLoggedIn ? <Link to={"/ch1"}><Button>Insights</Button></Link> : <Link to={"/login"}><Button>Login</Button></Link>}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;