import { useSelector } from 'react-redux'
import React from 'react'



export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
    <h1>Profile</h1>
    <form>
      <img
        src={currentUser.profileImage}
        alt="profile"
        className=""
      />
      <input
        defaultValue={currentUser.username}
        type="text"
        id="username"
        placeholder="username"
        className=""
      />
      <input
        defaultValue={currentUser.email}
        type="email"
        id="email"
        placeholder="Email"
        className=""
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        className=""
      />
      <button>update</button>
    </form>
    <div>
      <span>Delete Account</span>
      <span>Sign out</span>
    </div>
  </div>
);
}