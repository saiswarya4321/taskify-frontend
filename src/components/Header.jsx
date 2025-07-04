import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../redux/features/userSlice';

axios.defaults.withCredentials = true;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  console.log("user details", user)
  useEffect(() => {
    if (user && user.id) { // Make sure user has a valid id
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });

      //setIsLoggedIn(false);
      dispatch(removeUser())
      navigate('/');

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="flex justify-between items-center w-full p-6 bg-black text-white shadow-md">
      <div className="text-2xl font-bold flex flex-row justify-center items-center">
        <h1>TASKIFY</h1><div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

        </div>
      </div>

      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : '☰'}
        </button>
      </div>

      <nav className={`${menuOpen ? 'block' : 'hidden'} sm:flex`}>
        <ul className="flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-6 mt-4 sm:mt-0">

          {!isLoggedIn && (
            <>
              <Link to="/"><li className="cursor-pointer hover:text-gray-400">Login</li></Link>
              <Link to="/registration"><li className="cursor-pointer hover:text-gray-400">Registration</li></Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <li><Link to={"/app"}><div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </div></Link></li>

              <li className="cursor-pointer hover:text-gray-400">
                <Link to={"/app"}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </Link>
              </li>

              <li className="cursor-pointer hover:text-gray-400">
                <button onClick={handleLogout} className="bg-red-500 text-white rounded p-2 text-sm sm:mt-0">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
