import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import GetCovered from './pages/GetCoveredPage/GetCoveredPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetCovered/>}/>
      <Route path="/insure" element={<GetCovered/>}/>

    </Routes>
  );
}

export default App;
