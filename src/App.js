import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Predict from './Components/Predict/Predict';
import PredictedResults from './Components/PredictedResults/PredictedResults';
import Insights from './Components/Insights/Insights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predict" element={<Predict/>} />
        <Route path="/predicted" element={<PredictedResults/>} />
        <Route path="/insights" element={<Insights/>} />
      </Routes>
    </Router>
  );
}

export default App;
