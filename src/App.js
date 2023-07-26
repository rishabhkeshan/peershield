import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ProvideCapitalPage from "./pages/ProvideCapitalPage/ProvideCapitalPage";
import ClaimsPage from "./pages/ClaimsPage/ClaimsPage";
import DAOPage from "./pages/DAOPage/DAOPage";
import SideNavbar from "./components/Navbar/SideNavbar";
import GetCovered from "./pages/GetCoveredPage/GetCoveredPage";
import RiskAssessment from "./pages/RiskAssessmentPage/RiskAssessmentPage";
import StakePage from "./pages/StakePage/StakePage";

function App() {
  return (
    <div className="app">
      <SideNavbar />
      <div className="app_main">
        <Routes>
          <Route path="/" element={<GetCovered />} />
          <Route path="/insure" element={<ProvideCapitalPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/riskassessment" element={<RiskAssessment/>}/>
          <Route path="/stake" element={<StakePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
