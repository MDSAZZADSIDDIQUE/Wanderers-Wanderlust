import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost normal-case text-xl font-black max-sm:text-sm"
        >
          Wanderer's Wanderlust
        </Link>
      </div>
      <div className="flex-none">
        <Link to={"/login"} className="btn btn-outline btn-md max-sm:btn-sm">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
