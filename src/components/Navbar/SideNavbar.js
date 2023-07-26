import React from "react";
import PeerShield from "../../assets/PeerShield_Dark.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import { Link, useLocation } from "react-router-dom";
import "./SideNavbar.scss";
import { mainnetChains, useAccount, useConnect, useDisconnect } from "graz";

export default function SideNavbar() {
  const location = useLocation();
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  function handleConnect() {
    return isConnected ? disconnect() : connect();
  }
  return (
    <div className="sidenav">
      <Link to="/" className="sidenav_logocontainer">
        <img src={PeerShield} alt="PeerShield Logo" />
      </Link>
      <div className="sidenav_routecontainer">
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/"
        >
          GET COVERED
        </Link>
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/insure"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/insure"
        >
          SUPPLY CAPITAL
        </Link>
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/claims"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/claims"
        >
          CLAIMS
        </Link>
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/stake"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/stake"
        >
          STAKE
        </Link>
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/riskassessment"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/riskassessment"
        >
          RISK ASSESSMENT
        </Link>
        <Link
          className={`sidenav_routecontainer_text ${
            location.pathname === "/governance"
              ? "text-white sidenav_routecontainer_text_active"
              : ""
          }`}
          to="/governance"
        >
          GOVERNANCE
        </Link>
      </div>
      {/* <div className="sidenav_walletcontainer">
        <div
          onClick={handleConnect}
          className="sidenav_walletcontainer_connectbutton"
        >
          {isConnected
            ? `${account.bech32Address.substring(
                0,
                8
              )}...${account.bech32Address.substring(
                account.bech32Address.length - 6
              )}`
            : "Connect Wallet"}
        </div>
      </div> */}
    </div>
  );
}
