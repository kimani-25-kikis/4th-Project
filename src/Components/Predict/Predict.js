import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import './Predict.css'
import graph from '../../assets/predictiongraph.png'
import { useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";

const Predict = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert(`Form submitted by ${formData.name}`);
        navigate('/predicted')
      };

    return(
        <>
        <Header/>

        <div className="mainContainer">
            <div className="inputForm">
                <h2>Input Data to Predict Yield</h2>
            <form onSubmit={handleSubmit}>

                <div className="formContainer">

                <div className="environmental">
                    <h3 style={{color:"rgb(9,245,17)", fontWeight:"300"}}>Environmental factors</h3>

<div className="inputField">
      <input
      type="text"
      id="temperature"
      name="temperature"
      placeholder="Temperature(0 Celcius)"
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
      placeholder="Soil PH value"
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
<h3 style={{color:"rgb(9,245,17)", fontWeight:"300"}}>Agronomic factors</h3>

<div className="inputField">
        <select
          id="fertilizertype"
          name="fertilizertype"
          value={formData.fertilizertype}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select fertilizer type
          </option>
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
          <option value="" disabled>
            Select planting density
          </option>
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
          <option value="" disabled>
            Select no. of weeks
          </option>
          <option value="2">2 Weeks</option>
          <option value="6">6 Weeks</option>
          <option value="8">8 Weeks</option>
        </select>
</div>

</div>
                </div>
                

                 

                <button type="submit">
                    Predict
                 </button>
                </form>
            </div>

            <div className="graph">
            <img
            src={graph}
            height={300}
            width={350}
            alt="Yield Graph"
            />
            </div>

        </div>

        <Footer/>
        </>
        
    )
    
}

export default Predict