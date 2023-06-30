import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }
  /*if (!ready){
        return 'Loading...';
    }*/

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }




  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
 
  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary  text-white";
    }
    else{
        classes += " bg-gray-200";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 pb-10 gap-2 ">
        <Link className={linkClasses("profile")} to={"/account/profile"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>

        <Link className={linkClasses("sales")} to={"/sales"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          Sales Data
        </Link>

        <Link className={linkClasses("marketing")} to={"/account/marketing"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          Marketing Data
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <div className="flex flex-col px-10 py-10">
            <span className="px-3 py-2">Name - {user.name}<br/></span>
            <span className="px-3 py-2">Department - {user.department}<br/></span>
            <span className="px-3 py-2">Designation - {user.designation}<br/></span>
            <span className="px-3 py-2">EmployeeID - {user.employeeID}</span>
          </div>
          <div>
          <Link to="/profileSetting">
          <button className="primary max-w-sm mt-2 mb-5">
            Edit Your Profile 
          </button>
          </Link>
          </div>
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-5">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
