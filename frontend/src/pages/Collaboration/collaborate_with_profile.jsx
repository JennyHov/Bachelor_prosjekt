import React from 'react';

export default function collaborate_with_profile() {
    return (
        <div className="container w-1440 h-1508 p-175 border-b border-zinc-400 flex flex-col justify-center items-center gap-50">
            <section className="profile-info self-stretch h-540 flex flex-col justify-start items-center">
                <header className="profile-heading self-stretch justify-center items-start flex-grow">
                    <h1 className="profile-title text-center text-black text-4xl font-bold font-inter leading-70">You already have a profile</h1>
                </header>
                <div className="profile-description self-stretch h-53 flex flex-col justify-center items-center gap-2.5">
                    <p className="description-text self-stretch pl-0.5 py-9 text-center text-black text-base font-normal font-inter leading-35">
                        Go ahead and look through the different profiles and look for potential team members!
                    </p>
                </div>
                <div id='profile-pic'>
                    <img src={stockImage} alt="Profile" />
                    <label htmlFor="input-file">Update image</label>
                    <input type="file" accept='image/jpeg, image/png, image/jpg' id='input-file'/>  
                </div>
                <div className="profile-details self-stretch py-2.5 flex justify-center items-center gap-2.5">
                    <div className="profile-info-column self-stretch p-2.5 flex flex-col justify-start items-center gap-2.5">
                        <div className="info-row self-stretch h-76 flex flex-col justify-start items-start">
                            <span className="info-label text-black text-sm font-normal font-inter leading-7">Full Name</span>
                            <div className="info-value self-stretch h-12 px-3 py-2.5 bg-stone-50 rounded-10 border border-zinc-200 flex flex-col justify-center items-start">Jenny Hovland</div>
                        </div>                        
                    </div>
                    <div className="profile-info-column self-stretch p-2.5 flex flex-col justify-start items-center gap-2.5">                        
                    </div>
                </div>
                <div className="edit-profile-btn self-stretch px-2.5 justify-start items-center">
                    <button className="btn btn-primary px-23 py-3 rounded-full flex flex-col justify-center items-center">
                        <span className="text-white text-base font-semibold font-inter uppercase tracking-tight">Edit Profile</span>
                    </button>
                </div>
            </section>
            <section className="search-options self-stretch py-35 justify-center items-center gap-61">
                <div className="search-by-keyword self-stretch h-68 p-2.5 flex justify-center items-start gap-2.5">
                    <div className="keyword-search self-stretch px-15 py-2.5 bg-stone-50 rounded-10 border border-zinc-200 flex flex-col justify-center items-start">Search by keyword</div>
                </div>
                <div className="search-filters pl-50 flex justify-center items-center gap-50">
                    <div className="role-filter p-2.5 flex justify-center items-start gap-2.5">
                        <span className="filter-label text-black text-lg font-normal font-inter leading-35">Role</span>
                        <div className="role-options px-9 py-3 flex flex-col justify-center items-center"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}