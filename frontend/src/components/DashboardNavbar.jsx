import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../components/UserContext";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardNavbar = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/user/userprofile", {
          withCredentials: true,
        })
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error(error.message);
          navigate("/login");
        });
    };
    fetchData();
  }, []);
  return (
    <div className="navbar bg-base-100 font-serif">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl font-black">
          Wanderer's Wanderlust
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control"></div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={`http://localhost:3000/user/getprofilepicture/${userDetails.profilePicture}`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/userprofile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"} className="justify-between">
                Read Blogs
              </Link>
            </li>
            <li>
              <Link to={"/publishblog"} className="justify-between">
                Publish Blog
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
