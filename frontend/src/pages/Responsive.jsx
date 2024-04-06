import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../css/card.css';

import magnusImage from '../../../assets/images/home/magnus.png';

function Responsive() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="container-fluid slide-container swiper">
        <div className="slide-content">
          <div className="card-wrapper swiper-wrapper slider-content">
          <Slider {...settings}>
            <div className="col-sm-4 mx-4 card swiper-slide">
              <div className="image-content">
                <span className="overlay"></span>
                <div className="card-image">
                  <img className="card-img" src={magnusImage} alt="Card Image" />
                </div>
              </div>
              <div className="card-content">
                  <p className="card-name">Magnus Svendsen</p>
                  <p className="card-category">CEO</p>
                  <p className="card-description">CEO</p>
                  <p className="card-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
              </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
            <div className="col-sm-4 contact-item mx-4">
              <div>
                <img className="contact-image" src={magnusImage} alt="Contact Image" />
              </div>
                <div className="contact-details">
                    <p className="contact-name">Magnus Svendsen</p>
                    <p className="contact-role">CEO</p>
                    <p className="contact-email"><a href="mailto:kontakt@sefio.no">kontakt@sefio.no</a></p>
                </div>
            </div>
          </Slider>
          </div>
        </div>
      </div>
    );
  }
  
  export default Responsive;