import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import auth from "../firebase.init";

const Navbar = () => {

  const location = useLocation();
  const [user] = useAuthState(auth)

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken')
  }

  return (
    <header
      className={`w-full ${
        location.pathname === "/" ? "bg-primary text-base-100" : ""
      }`}
    >
      <div className={`flex justify-between items-center py-4 px-4 max-w-7xl mx-auto font-medium `}>
      <div>
        <h1 className="text-2xl">My Todo's</h1>
      </div>
      <nav>
        <ul className="flex space-x-2">
          {
            user ?
            <>
            <li>
      <label htmlFor='add-task-modal' className=" modal-button cursor-pointer">Add Task</label>
          </li>
          <li>
            <button className="font-medium" onClick={logout}>Logout</button>
          </li>
            </>
          :
          <>
        </>
          }
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Navbar;
