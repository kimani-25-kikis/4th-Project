import React, { useState } from "react";
import Header from "../Header/Header";
import './Predict.css'
import graph from '../../assets/predictiongraph.png'
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";
import { BarChart } from '@mui/x-charts/BarChart';

const Predict = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        temperature: '',
        rainfall: '',
        soilph: '',
        humidity: '',
        fertilizertype: '',
        fertilizerquantity: '',
        plantingdensity: '',
        weeks: '',
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        console.log("Sending data:", formData);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            console.log("Response Status:", response.status);
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log("Received Response:", responseData); // Debugging print
    
            if (responseData.condition) {
                setPrediction(responseData.condition);
                setImageUrl(`http://127.0.0.1:5000/images${responseData.image_url}`);
                const newImageUrl = `http://127.0.0.1:5000/images${responseData.image_url}`;
                //alert(`Prediction received: ${responseData.condition}`);
                // Navigate to PredictionResults and pass prediction data
                navigate("/predicted", { state: { prediction: responseData.condition, imageUrl: newImageUrl, Weeks: formData.weeks } });
            } else {
                throw new Error("Missing 'condition' in response");
            }
    
        } catch (error) {
            setError("Failed to fetch prediction! Please check your input values.");
            console.error("Error fetching prediction:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <Header />

            <div className="mainContainer">
                <div className="inputForm">
                    <h2>Input Data to Predict Yield</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <div className="environmental">
                                <h3 style={{ color: "rgb(9,245,17)", fontWeight: "300" }}>Environmental factors</h3>

                                <div className="inputField">
                                    <input
                                        type="text"
                                        id="temperature"
                                        name="temperature"
                                        placeholder="Temperature (°C)"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputField">
                                    <input
                                        type="text"
                                        id="rainfall"
                                        name="rainfall"
                                        placeholder="Rainfall (mm)"
                                        value={formData.rainfall}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputField">
                                    <input
                                        type="text"
                                        id="soilph"
                                        name="soilph"
                                        placeholder="Soil PH value(0 - 14)"
                                        value={formData.soilph}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputField">
                                    <input
                                        type="text"
                                        id="humidity"
                                        name="humidity"
                                        placeholder="Humidity (%)"
                                        value={formData.humidity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="agronomic">
                                <h3 style={{ color: "rgb(9,245,17)", fontWeight: "300" }}>Agronomic factors</h3>

                                <div className="inputField">
                                    <select
                                        id="fertilizertype"
                                        name="fertilizertype"
                                        value={formData.fertilizertype}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select fertilizer type</option>
                                        <option value="NPK">NPK</option>
                                        <option value="Urea">Urea</option>
                                        <option value="Organic">Organic</option>
                                    </select>
                                </div>

                                <div className="inputField">
                                    <input
                                        type="text"
                                        id="fertilizerquantity"
                                        name="fertilizerquantity"
                                        placeholder="Fertilizer Quantity (kg/ha)"
                                        value={formData.fertilizerquantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputField">
                                    <select
                                        id="plantingdensity"
                                        name="plantingdensity"
                                        value={formData.plantingdensity}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select planting density</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>

                                <div className="inputField">
                                    <select
                                        id="weeks"
                                        name="weeks"
                                        value={formData.weeks}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select no. of weeks</option>
                                        <option value="2">2 Weeks</option>
                                        <option value="6">6 Weeks</option>
                                        <option value="8">8 Weeks</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Predicting..." : "Predict"}
                        </button>
                    </form>

                    <div>
                        {error && <p className="error">{error}</p>}
                        
                    </div>
                    
                </div>

                <div className="graph">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['2022', '2023', '2024'], label: 'Year' }]}
                    yAxis={[{ label: 'Production (tons/ha)' }]}
                    series={[
                        { data: [4, 3, 5], label: 'Temperature (°C)', color: '#FF5733' },
                        { data: [1, 6, 3], label: 'Rainfall (mm)', color: '#3498DB' },
                        { data: [2, 5, 6], label: 'Soil pH', color: '#2ECC71' },
                    ]}
                width={500}
                height={400}
                />
                    
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Predict;
