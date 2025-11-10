import React from "react";
import Slider from "react-slick";
import { ChevronRight, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import home1 from "../assets/hero-carousel-1.jpg";
import home2 from "../assets/hero-carousel-2.jpg";
import home3 from "../assets/hero-carousel-3.jpg";
import OnCall from "../components/OnCall";
import Doctors from "../components/Doctors"
import Departments from "../components/Departments";


const HomePage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    cssEase: "ease-in-out",
  };

  return (
    <>
      {/* Hero Section with Slider */}
      <div className="relative">
        <Slider {...settings}>
          {[
            {
              img: home1,
              title: "Book Appointments Easily",
              desc: "Say goodbye to long waiting times and phone calls. With MediConnect, you can book your doctor’s appointment in seconds — anytime, anywhere. Manage your visits, receive reminders, and stay connected to your healthcare provider all in one place.",
            },
            {
              img: home2,
              title: "Meet the Best Doctors",
              desc: "Our platform connects you with a wide network of trusted, certified, and experienced doctors across multiple specialties. Whether you need a quick consultation or a regular checkup, you’ll always find the right expert to take care of your health.",
            },
            {
              img: home3,
              title: "Your Health, Our Priority",
              desc: "We believe healthcare should be simple, reliable, and personal. MediConnect is designed to help you access quality medical care from the comfort of your home, ensuring your well-being and peace of mind come first every step of the way.",
            },
          ].map((slide, index) => (
            <div key={index} className="relative h-[700px]">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-600 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white max-w-3xl leading-relaxed">
                  {slide.desc}
                </p>
                <button
                  onClick={() => navigate("/about")}
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Read More
                  <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/*Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Why Choose MediConnect?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Qualified Doctors",
              desc: "Connect with experienced and verified medical professionals.",
            },
            {
              title: "Instant Booking",
              desc: "Book your appointment in just a few clicks.",
            },
            {
              title: "24/7 Support",
              desc: "Get assistance anytime from our support team.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>


        
      </div>


      

<div className="w-full flex flex-col items-center justify-center">
  <Departments/>
  <Doctors/>
  <OnCall/>
</div>

    </>
  );
};

export default HomePage;
