import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import { useLocation } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import "./Navbar.scss";
import MyCover from "../../assets/MyCoverIcon.svg";
import RiskAssessmentNavbar from "./RiskAssessmentNavbar";
import ClaimsNavbar from "./ClaimsNavbar";
import { useAccount, useConnect, useDisconnect } from "graz";
import { CosmWasmClient } from "cosmwasm";

const peerContractAddress =
  "osmo1069f56wca7c5n37at4g4x4lqykxctngel4zp3h0xhnh9jcdfvmasffxn9v";
const osmosisRPC = "https://rpc.osmotest5.osmosis.zone";

export default function Navbar() {
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const [peerTokens, setPeerTokens] = useState("0");

  useEffect(() => {
    if (account) {
      getPeerTokens();
    }
  }, [account]);
  const getPeerTokens = async () => {
    const client = await CosmWasmClient.connect(osmosisRPC);
    const query = {
      balance: {
        address: account.bech32Address,
      },
    };
    const tx = await client.queryContractSmart(peerContractAddress, query);
    setPeerTokens(tx.balance);
  };
  const routeCardData = {
    "/": [
      {
        text: "0 USD",
        subtext: "My Cover",
        icon: MyCover,
      },
      {
        text: "250 USD",
        subtext: "My Active Covers",
        icon: MyCover,
      },
      {
        text: "$10/month",
        subtext: "My Insurance Fees",
        icon: MyCover,
      },
      {
        text: "-",
        subtext: "My Ongoing Claims",
        icon: MyCover,
      },
    ],
    "/insure": [
      {
        text: "0 USD",
        subtext: "Supplied Capital",
        icon: MyCover,
      },
      {
        text: "250 USD",
        subtext: "Active Capital Pools",
        icon: MyCover,
      },
      {
        text: "15.69%",
        subtext: "Total APY",
        icon: MyCover,
      },
      {
        text: "-",
        subtext: "Ongoing Claims",
        icon: MyCover,
      },
    ],
    "/stake": [
      {
        text: `${peerTokens} Peer`,
        subtext: "Available Token",
        icon: MyCover,
      },
      {
        text: "5.6%",
        subtext: "Staking APR",
        icon: MyCover,
      },
      {
        text: "28 Days",
        subtext: "Unbonding Period",
        icon: MyCover,
      },
    ],
  };
  const location = useLocation();

  const cardData = routeCardData[location.pathname] || [];
  const claims = [
    {
      text: "0 USD",
      subtext: "Total Claims Paid",
      icon: MyCover,
    },
    {
      text: "250 USD",
      subtext: "Number of Paid Claims",
      icon: MyCover,
    },
    {
      text: "15.69%",
      subtext: "Success Rate",
      icon: MyCover,
    },
  ];

  return (
    <div className="navbar">
      <TopNavbar />
      {cardData.length > 0 && <BottomNavbar cardData={cardData} />}
      {location.pathname === "/riskassessment" && <RiskAssessmentNavbar />}
      {location.pathname === "/claims" && <ClaimsNavbar cardData={claims} />}
    </div>
  );
}
