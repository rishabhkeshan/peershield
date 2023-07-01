import React from "react";
import TopNavbar from "./TopNavbar";
import { useLocation } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import "./Navbar.scss";
import MyCover from "../../assets/MyCoverIcon.svg";

export default function Navbar() {
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
  };
  const location = useLocation();

  const cardData = routeCardData[location.pathname] || [];

  return (
    <div className="navbar">
      <TopNavbar />
      {cardData.length > 0 && <BottomNavbar cardData={cardData} />}
    </div>
  );
}
