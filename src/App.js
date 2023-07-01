import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import GetCovered from './pages/GetCoveredPage/GetCoveredPage';
import ProvideCapitalPage from './pages/ProvideCapitalPage/ProvideCapitalPage';
import ClaimsPage from './pages/ClaimsPage/ClaimsPage';
import DAOPage from './pages/DAOPage/DAOPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetCovered/>}/>
      <Route path="/insure" element={<ProvideCapitalPage/>}/>
      <Route path="/claims" element={<ClaimsPage/>}/>
      <Route path="/dao" element={<DAOPage/>}/>
    </Routes>
  );
}

export default App;
