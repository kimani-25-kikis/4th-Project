import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Predict from './Components/Predict/Predict';
import PredictedResults from './Components/PredictedResults/PredictedResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predict" element={<Predict/>} />
        <Route path="/predicted" element={<PredictedResults/>} />
      </Routes>
    </Router>
  );
}

export default App;
