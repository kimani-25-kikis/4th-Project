import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import './PredictedResults.css';
//import BarChart from "../BarChart/BarChart";
import { BarChart } from '@mui/x-charts/BarChart';

const PredictedResults = () => {
    const location = useLocation();
    const { prediction, imageUrl, Weeks } = location.state || {}; // Extract prediction and image URL

    const [recommendations, setRecommendations] = useState([]);

    const [formData, setFormData] = useState({
        temperature: 30,  // Example values (Replace with real formData values)
        rainfall: 120,
        soilph: 6.5,
        humidity: 70,
        fertilizertype: "NPK",
        fertilizerquantity: 50,
        plantingdensity: 100,
        weeks: 6,
    });

    const maizeProduction = prediction === "Good" ? 800 : prediction === "Bad" ? 400 : 1000; // Example logic

    // Function to generate recommendations based on prediction
    const generateRecommendations = (condition) => {
        switch (condition) {
            case "Bad":
                return [
                    "Increase fertilizer application to 70 kg/hectare.",
                    "Improve on the fertilizer that you apply on your maize plant, I personally recommend NPK mostly during germination phases to boost root strength.",
                    "Improve irrigation to maintain adequate soil moisture.",
                    "Use high-yield maize varieties for better production.",
                    "Regularly check the PH value of your soil, best when it is between 5.5-7. If below that consider adding lime.",
                    "Maintain proper spacing between plants to avoid overcrowding. Never ever condense maize crops if you need best results."
                ];
            case "Good":
                return [
                    "Maintain proper spacing between plants to avoid overcrowding. Never ever condense maize crops if you need best results.",
                    "Regularly check your soil PH before planting, make sure it is never below 5 or above 7.5.",
                    "Ensure balanced use of fertilizer (NPK ratio 20-20-20).",
                    "Topping with CAN can also maximize your maize yield",
                    "Regularly check for pests and diseases."
                ];
            case "Best":
                return [
                    "Continue using current farming practices.",
                    "Monitor soil pH weekly and maintain it between 5.5 and 7.",
                    "Avoid excessive fertilizer use to prevent soil degradation.",
                    "Never ever condense maize crops if you need best results.",
                    "Next season consider crop rotation to get best yields."
                ];
            default:
                return ["No specific recommendations available."];
        }
    };

    // Use useEffect to set recommendations when prediction changes
    useEffect(() => {
        if (prediction) {
            setRecommendations(generateRecommendations(prediction));
        }
    }, [prediction]); // Runs only when `prediction` changes

    return (
        <>
            <Header />
            <div className="containerCard">
                <h2>Predicted Maize Plant Picture</h2>
                <h3>{Weeks} weeks old</h3>
                <h2>Prediction Results</h2>
                {prediction ? (
                    <p className="prediction-result">Predicted Yield: {prediction}</p>
                ) : (
                    <p className="error">No prediction data found.</p>
                )}

                <img
                    src={imageUrl}
                    height={300}
                    width={600}
                    alt="Predicted Maize image"
                />

                <hr className="divider" />
                <h3>Recommendations</h3>
                <ol>
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ol>
                <hr className="divider" />

                <div>
                <h2>Maize Growth Analysis</h2>
            
                {/* Bar Chart */}
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['2022', '2023', '2024'], label: 'Year' }]}
                    yAxis={[{ label: 'Production (tons/ha)' }]}
                    series={[
                        { data: [4, 3, 5], label: 'Temperature (°C)', color: '#FF5733' },
                        { data: [1, 6, 3], label: 'Rainfall (mm)', color: '#3498DB' },
                        { data: [2, 5, 6], label: 'Soil pH', color: '#2ECC71' },
                    ]}
                width={600}
                height={400}
                />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PredictedResults;
