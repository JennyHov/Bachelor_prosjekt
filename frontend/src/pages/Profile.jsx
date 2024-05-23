import { useDispatch } from 'react-redux';
import { signOut, initialDeleteUser, endDeleteUser, failDeleteUser, initialUpdatedUser, endUpdatedUser, failUpdatedUser } from '../Redux/userStates/usersSlicer';
import { useSelector } from 'react-redux'
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { app } from '../firebase';
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';


export default function Profile() {
  const [picture, setPicture] = useState(undefined);
  const [picturePercentage, setPicturePercentage] = useState(0);
  const referanceFile = useRef(null);
  const [pictureError, setPictureError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatching = useDispatch();
  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  
  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (picture) {
      handlePictureUploading(picture);
    }
  }, [picture]);
  const handlePictureUploading = async (picture) => {
    const storage = getStorage(app);
    const nameOfFile = new Date().getTime()+picture.name;
    const referanceFromFirebase = ref(storage, nameOfFile);
    const uploadingTask = uploadBytesResumable(referanceFromFirebase, picture);
    uploadingTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPicturePercentage(Math.round(progress));
      },
      (error) => {
        setPictureError(true);
      },
      () => {
        getDownloadURL(uploadingTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profileImage: downloadURL })
        );
      }
    );
  };

  const handleUserProfileUpdated = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatching(initialUpdatedUser());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false ){
        dispatching(failUpdatedUser(data));
        return;
      }
      dispatching(endUpdatedUser(data));
      setSuccessfulUpdate(true);
      } catch (error){
        dispatching(failUpdatedUser(error));
      }
    };
  
  const handleSigningOut = async () => {
      try {
        await fetch ("/api/auth/signout");
        dispatching(signOut());

      }catch(error){
        console.log(error);
      }
    };

    const handleAccountDeletion = async () => {
      try{
        dispatching(initialDeleteUser());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          dispatching(failDeleteUser(data));
          return;
        }
        dispatching(endDeleteUser(data));

      }catch(error){
        dispatching(failDeleteUser(error));
      }
    };

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center profile-information-container">
          <div className="col-lg-8 profile-information-container">
            <h1 className="profile-information-title">Profile</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                ref={referanceFile}
                hidden
                accept="image/*"
                onChange={(e) => setPicture(e.target.files[0])}
                aria-label="Upload profile picture"
              />
              <img
                src={formData.profileImage || currentUser.profileImage}
                alt="profile"
                className="img-fluid"
                onClick={() => referanceFile.current.click()}
                role="button"
                aria-describedby="profile-image-instructions"
              />
              <p id="profile-image-instructions" className="visually-hidden">
                Click to upload a new profile picture.
              </p>
              <p>
                {pictureError ? (
                  <span>Error when uploading picture (file size must be less than 3 MB)</span>
                ) : picturePercentage > 0 && picturePercentage < 100 ? (
                  <span>{`Uploading in progress: ${picturePercentage}%`}</span>
                ) : picturePercentage === 100 ? (
                  <span>Picture uploaded successfully!</span>
                ) : (
                  ""
                )}
              </p>
              <div className='form-group'>
                <label htmlFor="fullName" className="visually-hidden">Full Name</label>
                <input
                  defaultValue={currentUser.fullName}
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="form-control"
                  onChange={handleUserProfileUpdated}
                  aria-required="true"
                />
              </div>
              <div className='form-group'>
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input
                  defaultValue={currentUser.email}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={handleUserProfileUpdated}
                  aria-required="true"
                />
              </div>
              <div className='form-group'>
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={handleUserProfileUpdated}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Loading in progress..." : "Update"}
              </button>
            </form>
            <div>
              <button type="button" onClick={handleAccountDeletion} className="btn btn-danger">Delete Account</button>
              <button type="button" onClick={handleSigningOut} className="btn btn-secondary">Sign out</button>
            </div>
            {error && <div role="alert">Something went wrong!</div>}
            <p>
              {successfulUpdate && "User has been updated!"}
            </p>
          </div>
        </div>
      </div>
  );    
}