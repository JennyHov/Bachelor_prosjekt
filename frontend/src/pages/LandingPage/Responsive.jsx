import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../../css/card.css';

import stockImage from '../../../../assets/images/profilePics/stock_photo.jpg';

function CenterMode() {
    const settings = {
      centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
    };
    return (
      <div className="container-fluid slider-container section profile-row">
        <section className="slider-container">
          <header className="content">
            <h1 className="title previous-winners-title">Previous Winners</h1>
          </header>
          <Slider {...settings}>
            <article className="col-sm-4 card mx-3">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Lars Johansen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Lars Johansen</p>
                <p className="card-category">Technology</p>
                <p className="card-description">Created a revolutionary AI-powered virtual assistant that streamlines administrative tasks for small businesses</p>
                <p className="card-email"><a href="mailto:lars.johansen@example.com">lars.johansen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Ingrid Olsen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Ingrid Olsen</p>
                <p className="card-category">Environment</p>
                <p className="card-description">Proposed a community-driven reforestation initiative using drone technology to plant trees in deforested areas</p>
                <p className="card-email"><a href="mailto:ingrid.olsen@example.com">ingrid.olsen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Henrik Andreasen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Henrik Andreasen</p>
                <p className="card-category">People</p>
                <p className="card-description">Introduced a gamified learning platform that engages students in interactive lessons tailored to their individual learning styles</p>
                <p className="card-email"><a href="mailto:henrik.andreasen@example.com">henrik.andreasen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Astrid Larsen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Astrid Larsen</p>
                <p className="card-category">Technology</p>
                <p className="card-description">Proposed a blockchain-based platform that securely connects freelance professionals with clients worldwide</p>
                <p className="card-email"><a href="mailto:astrid.larsen@example.com">astrid.larsen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Einar Pedersen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Einar Pedersen</p>
                <p className="card-category">Technology</p>
                <p className="card-description">Pitched a renewable energy solution harnessing kinetic energy from urban environments</p>
                <p className="card-email"><a href="mailto:einar.pedersen@example.com">einar.pedersen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Hanne Sørensen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Hanne Sørensen</p>
                <p className="card-category">Environment</p>
                <p className="card-description">Pitched a solar-powered desalination system designed to provide clean drinking water to remote coastal communities</p>
                <p className="card-email"><a href="mailto:hanne.sorensen@example.com">hanne.sorensen@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Kristoffer Solberg" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Kristoffer Solberg</p>
                <p className="card-category">People</p>
                <p className="card-description">Launched a mental health app offering personalized therapy sessions and peer support networks</p>
                <p className="card-email"><a href="mailto:kristoffer.solberg@example.com">kristoffer.solberg@example.com</a></p>
              </div>
            </article>
            <article className="col-sm-4 mx-3 card">
              <div className="image-content">
                <div className="card-image">
                  <img className="card-img" src={stockImage} alt="Mari Haugen" />
                </div>
              </div>
              <div className="card-content">
                <p className="card-name">Mari Haugen</p>
                <p className="card-category">Environment</p>
                <p className="card-description">Developed a smart waste management solution using IoT sensors and AI algorithms to optimize recycling processes</p>
                <p className="card-email"><a href="mailto:mari.haugen@example.com">mari.haugen@example.com</a></p>
              </div>
            </article>
          </Slider>
        </section>
      </div>
    );
  }
  
  export default CenterMode;