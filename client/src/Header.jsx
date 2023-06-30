import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import logo1 from './vblLogo.png';
export default function Header() {
  const {user} = useContext(UserContext);
  return(
        <header className="flex justify-between">
        <Link to ={'/'} className="flex items-center gap-1">
        <img src = {logo1} className='h-12 w-18' alt="none"/>
          <span className="font-bold text-xl ">Varun Beveraged Limited</span>
        </Link>
        
        <Link to ={user?'/account':'/login'}className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-5 shadow-md font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-400 text-white rounded-full border border-gray-300 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
    );
}