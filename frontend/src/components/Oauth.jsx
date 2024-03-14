import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import React from 'react'
import { endSignIn } from '../Redux/userStates/usersSlicer';

export default function Oauth() {
  const dispatching = useDispatch();
  const handleGoogleOAuthClick = async () => {
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatching(endSignIn(data));
    } catch(error){
      console.log("Error logging in with google", error);
    }
  };
  return (
    <button type="button" onClick={handleGoogleOAuthClick}>
        Login with google      
    </button>
  )
}
