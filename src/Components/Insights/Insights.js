import React from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Insights.css";
import maize1 from '../../assets/maizecorn1.jpg'
import maize2 from '../../assets/maizecorn2.jpeg'
import maize3 from '../../assets/maizegrains.jpg'
import maize4 from '../../assets/maizecorn4.jpeg'
import maize5 from '../../assets/maizecorn5.png'
import maize6 from '../../assets/maizecorn6.jpeg'

const Insights = () => {
    // Sample data
    const productionData = [4.5, 5.2, 6.0, 7.1, 8.5]; // Production in tons/ha
    const years = ["2020", "2021", "2022", "2023", "2024"];
    
    const factorsData = {
        temperature: [25, 27, 29, 26, 30], // in Celsius
        rainfall: [300, 320, 280, 350, 400], // in mm
        soilPh: [5.5, 5.8, 6.0, 5.7, 6.2] // pH level
    };

    const fertilizerData = [
        { label: "Organic", value: 15 },
        { label: "NPK", value: 35 },
        { label: "Urea", value: 20 },
        { label: "DAP", value: 30 }
    ];

    return (
        <>
            <Header />
            <div className="insights-container">
                <h1>Maize</h1>

                <div className="maizeImages">
                    <div className="image">
                    <img src={maize1} height={200} width={200} alt="maize image"/>
                    </div>
                    <div className="image">
                    <img src={maize2} height={200} width={200} alt="maize image"/>
                    </div>
                    <div className="image">
                    <img src={maize3} height={200} width={200} alt="maize image"/>
                    </div>
                    <div className="image">
                    <img src={maize4} height={200} width={200} alt="maize image"/>
                    </div>
                    <div className="image">
                    <img src={maize5} height={200} width={200} alt="maize image"/>
                    </div>
                    <div className="image">
                    <img src={maize6} height={200} width={200} alt="maize image"/>
                    </div>
                </div>

                <div>
                <h1>Maize Crop Insights</h1>
                <p>Maize, Zea mays L. (corn), is the most abundantly produced cereal in the world. It is grown in every continent except Antarctica. About 50 species exist and consist of different colors, textures, and grain shapes and sizes. White, yellow, and red are the most common cultivated maize types. The white and yellow varieties are preferred by most people depending on the region. Maize, which was domesticated in central Mexico around 1500 BC, was introduced into Africa around 1500 AD, and spread to every corner of the continent within a relatively short period and is now Africa’s most important cereal crop.</p>
                <h3>Maize Production</h3>
                <p>Maize production in Africa was around 75 million tons in 2018, representing 7.5% of world maize production. Maize occupies approximately 24% of farmland in Africa and the average yield stagnates at around 2 tons/hectare/year. The largest African producer is Nigeria with over 33 million tons, followed by South Africa, Egypt, and Ethiopia. Africa imports 28% of its required maize grain from countries outside the continent as most of the maize production in Africa is done under rain-fed conditions. Irregular rainfall can trigger shortages and famines during occasional droughts.</p>
                </div>
                
                <div className="graphs">
                    <div className="graphs-container">
                    <div>
                        {/* Bar Chart - Environmental Factors vs. Production */}
                <h2>Effect of Environmental Factors on Production</h2>
                <BarChart
                    xAxis={[{ scaleType: "band", data: years, label: "Years" }]}
                    series={[
                        { data: factorsData.temperature, label: "Temperature (°C)" },
                        { data: factorsData.rainfall, label: "Rainfall (mm)" },
                        { data: factorsData.soilPh, label: "Soil pH" }
                    ]}
                    width={600}
                    height={400}
                />
                    </div>
                    <div>
                        {/* Line Chart - Production Trends Over Years */}
                <h2>Maize Production Trends Over the Years</h2>
                <LineChart
                    xAxis={[{ scaleType: "band", data: years, label: "Years" }]}
                    series={[{ data: productionData, label: "Production (tons/ha)" }]}
                    width={600}
                    height={400}
                />
                    </div>

                    </div>

                    {/* Pie Chart - Fertilizer Usage */}
                <h2>Fertilizer Type Distribution</h2>
                <PieChart
                    series={[{
                        data: fertilizerData,
                        innerRadius: 40,
                        outerRadius: 100,
                        label: "Fertilizer Type"
                    }]}
                    width={400}
                    height={400}
                />
                   
                </div>
                

                

                

                {/* Recommendations */}
                <div className="recommendations">
                    <h2>Key Recommendations</h2>
                    <ul>
                        <li>Maintain soil pH between 5.8 - 6.5 for optimal maize growth.</li>
                        <li>Use balanced fertilizers like NPK (20-20-20) for better yield.</li>
                        <li>Ensure proper irrigation, especially in dry seasons.</li>
                        <li>Monitor temperature and avoid extreme weather conditions.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Insights;
