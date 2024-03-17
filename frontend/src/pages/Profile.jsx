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
  
  const { currentUser } = useSelector((state) => state.user);
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
  return (
    <div>
    <h1>Profile</h1>
    <form>
      <input type="file" ref={referanceFile} hidden accept="image/*" onChange={(e) => setPicture(e.target.files[0])}/>
      <img
        src={formData.profileImage || currentUser.profileImage}
        alt="profile"
        className=""
        onClick={() => referanceFile.current.click()}
      />
      <p>
        {pictureError ? (<span>Error when uploading picture (file size must be less than 3 MB)</span>
        ) : picturePercentage > 0 && picturePercentage < 100 ? ( <span>{`Uploading in progress: ${picturePercentage}%`}</span>
        ) : picturePercentage === 100 ? (<span>Picture uploaded successfully!</span>
        ) : ( 
          "" 
        )}
      </p>
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