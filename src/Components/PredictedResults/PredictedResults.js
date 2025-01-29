import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import maize from '../../assets/maize_21.jpg'
import './PredictedResults.css'
import Footer from "../Footer/Footer";

const PredictedResults = () => {
    return(
        <>
        <Header/>

        <div className="containerCard">
            <h2>Predicted Maize Plant Picture</h2>
            <h3>2 weeks old</h3>

            <img
            src={maize}
            height={300}
            width={600}
            alt="Predicted Maize image"
            />

            <hr className="divider"/>
            <h3>Recommendations</h3>
            <ol>
                <li>Reduce the planting density of the crops for better growth.</li>
                <li>Adjust fertilizer application to 50 kg/hectare for improved growth.</li>
                <li>Monitor soil pH weekly and add lime if pH falls below 5.5.</li>
            </ol>
        </div>
        <Footer/>
        
        </>
        
    )
    
}

export default PredictedResults