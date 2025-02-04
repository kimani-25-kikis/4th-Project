import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import maizeLogo from "../../assets/maize_logo.png";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-3 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-1 ml-1">
          <img
            height={80}
            width={80}
            src={maizeLogo}
            alt="Maize Predictor Logo"
            style={{transform: 'rotate(-40deg)'}}
          />
          <h1 className="text-lg font-bold">
            MAIZE GROWTH PREDICTOR
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/predict" className="hover:text-gray-200">
              Predict
            </Link>
          </li>
          <li>
            <Link to="/insights" className="hover:text-gray-200">
              Insights
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
