import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const greeting = () => {
    if (!currentUser) return "Velkommen, Gjest!";
    return currentUser.role === "admin" ? "Hello Admin" : "Hei, Bruker";
  };

  return (
    <div>
      <h1>Home</h1>
      {greeting()}
      {
        currentUser && currentUser.role === "admin" && (
          <button style={{marginTop: "20px"}}>
            Admin-knapp
          </button>
        )
      }
    </div>
  );
}
