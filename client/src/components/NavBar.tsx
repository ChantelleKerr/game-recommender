import { useState } from "react";
import { FaUserCog, FaSearch } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";
import { Link } from "react-router-dom";

const NavBar = () => {
  const links = ["Home", "Rated", "Recommendations"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <div className="navbar bg-primary fixed z-10">
          <div>
            <SlGameController className="text-secondary text-4xl ml-2" />
          </div>
          <div className="w-full lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((link) => (
                <li>
                  <a className="text-secondary text-xs">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto bg-darkBlue pl-10"
              />
              <FaSearch className="absolute top-1/2 ml-3 transform -translate-y-1/2" />
            </div>
            <button className="btn btn-ghost btn-circle ml-3">
              <div className="indicator">
                <FaUserCog size="24" className="text-secondary" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar bg-primary fixed z-10">
          <div className="flex-1">
            <SlGameController className="text-secondary text-4xl ml-2" />
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto bg-darkBlue pl-10"
              />
              <FaSearch className="absolute top-1/2 ml-3 transform -translate-y-1/2" />
            </div>
            <Link to="/login">
              <button className="btn btn-sm bg-accent text-darkBlue ml-3">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
