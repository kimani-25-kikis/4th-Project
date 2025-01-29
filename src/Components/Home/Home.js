import React from "react";
import Header from "../Header/Header";
import "./Home.css"
import maize from "../../assets/maize_picture1.jpg"
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle button click and navigate to the predict page
  const handleClick = () => {
    navigate('/predict');
  };
  
  return (
    <div>
      <Header />

      <div className="mainContainer">
        {/* Main Title */}
        <div className="textContainer">
        <h1 className="largeText">
          Harness the Power of Data to Maximize Maize Yield.
        </h1>

        {/* Subheading */}
        <h3 className="smallerText">
          Analyze environmental and agronomic factors to predict growth and optimize yields.
        </h3>

        <div className="predictButton">
          <button onClick={handleClick}>Predict now</button>
        </div>

        </div>

        <div className="imageContainer">
          <img
          src={maize}
          height={370}
          width={550}
          alt="Maize Picture"
          />
        </div>

      </div>

      <Footer/>
    </div>
  );
};

export default Home;
