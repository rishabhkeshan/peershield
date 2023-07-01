import logo from "../../logo.svg";
import "./GetCoveredPage.scss";
import PeerShield from "../../assets/PeerShield_Dark.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { mainnetChains, useAccount, useConnect, useDisconnect } from "graz";
import Navbar from "../../components/Navbar/Navbar";


function GetCovered() {
  return (
    <article className="getcovered">
      <Navbar />
      <section className="getcovered_coverssection">
        <div className="getcovered_coverssection_header">
          <div className="getcovered_coverssection_header"></div>
        </div>
      </section>
    </article>
  );
}

export default GetCovered;
