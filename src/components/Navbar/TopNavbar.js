import React from "react";
import PeerShield from "../../assets/PeerShield_Dark.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { mainnetChains, useAccount, useConnect, useDisconnect } from "graz";

export default function TopNavbar() {
  const location = useLocation();
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  function handleConnect() {
    return isConnected ? disconnect() : connect();
  }
  return (
    <div className="navbar_topsection">
      <Link to="/" className="navbar_topsection_logocontainer">
        <img src={PeerShield} alt="PeerShield Logo" />
      </Link>
      <div className="navbar_topsection_routecontainer">
        <Link
          className={`navbar_topsection_routecontainer_text ${
            location.pathname === "/" ? "text-white" : ""
          }`}
          to="/"
        >
          GET COVERED
        </Link>
        <Link
          className={`navbar_topsection_routecontainer_text ${
            location.pathname === "/insure" ? "text-white" : ""
          }`}
          to="/insure"
        >
          SUPPLY CAPITAL
        </Link>
        <Link className="navbar_topsection_routecontainer_text" to="/claims">
          CLAIMS
        </Link>
        <Link className="navbar_topsection_routecontainer_text" to="/dao">
          DAO
        </Link>
      </div>
      <div className="navbar_topsection_walletcontainer">
        <div
          onClick={handleConnect}
          className="navbar_topsection_walletcontainer_connectbutton"
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
      </div>
    </div>
  );
}
