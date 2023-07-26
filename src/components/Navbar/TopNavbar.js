import React from "react";
import PeerShield from "../../assets/PeerShield_Dark.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "graz";
import {
  axelar,
  cosmoshub,
  sommelier,
  mainnetChains,
  testnetChains,
} from "graz/chains";

export default function TopNavbar() {
  const location = useLocation();
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  console.log(account);

  function handleConnect() {
    return isConnected
      ? disconnect()
      : connect({ chain: testnetChains.osmosistestnet5 });
  }
  const getLogoText = () => {
    switch (location.pathname) {
      case "/":
        return "Get Covered";
      case "/insure":
        return "Supply Capital";
      case "/claims":
        return "Claims";
      case "/riskassessment":
        return "Risk Assessment";
      case "/stake":
        return "Stake";
      default:
        return "";
    }
  };
  return (
    <div className="navbar_topsection">
      <Link to="/" className="navbar_topsection_logocontainer">
        {getLogoText()}
      </Link>
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
