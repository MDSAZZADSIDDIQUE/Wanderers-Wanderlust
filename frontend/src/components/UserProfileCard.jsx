import React, { useContext, useState } from "react";

import { UserContext } from "../components/UserContext";

const UserProfileCard = () => {
  const { userDetails } = useContext(UserContext);
  console.log(userDetails);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={`http://localhost:3000/user/getprofilepicture/${userDetails.profilePicture}`}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            {userDetails.firstName} {userDetails.lastName}
          </h1>
          <p className="py-6">{userDetails.email}</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
