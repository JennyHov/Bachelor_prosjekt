import React from 'react';

export default function collaborate() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center gap-3">
        <div className="col-lg-8 border-bottom border-zinc-400 p-4">
          <div className="row justify-content-center align-items-start gap-3">
            <div className="col-lg-12">
              <h1 className="text-center text-black font-bold font-inter text-4xl leading-14">Become more visible!</h1>
            </div>
            <div className="col-lg-12">
              <p className="text-center text-black font-normal font-inter text-base leading-10">
                We at SEFiO want to help students find a team or startups finding new members for their team
              </p>
            </div>
            <div className="col-lg-12">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-black font-normal font-inter text-sm leading-7">Full Name</label>
                  <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
                  <small id="fullNameHelp" className="form-text text-zinc-300 font-normal font-inter text-sm leading-7">Autofill</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-black font-normal font-inter text-sm leading-7">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                  <small id="emailHelp" className="form-text text-zinc-300 font-normal font-inter text-sm leading-7">Autofill</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="institution" className="form-label text-black font-normal font-inter text-sm leading-7">Institution</label>
                  <input type="text" className="form-control" id="institution" placeholder="Enter your institution" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label text-black font-normal font-inter text-sm leading-7">Description</label>
                  <textarea className="form-control" id="description" rows="3" placeholder="Write a description about what you're looking for or tell about yourself and ideas!"></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label text-black font-normal font-inter text-sm leading-7">Category</label>
                  <select className="form-select" id="category">
                    <option>Choose a category</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label text-black font-normal font-inter text-sm leading-7">Role</label>
                  <select className="form-select" id="role">
                    <option>Choose a role</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="publishCheck" />
                  <label className="form-check-label text-black font-normal font-inter text-sm leading-7" htmlFor="publishCheck">I accept to get published on the website</label>
                </div>
                <button type="submit" className="btn btn-orange btn-submit-profile mt-3">Submit Profile</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-4">
          <div className="row justify-content-center align-items-center gap-3">
            {/* Profile Cards */}
          </div>
        </div>
      </div>
    </div>
  );
}