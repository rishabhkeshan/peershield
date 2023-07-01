import React, { useState, useEffect, useRef } from "react";
import logo from "../../logo.svg";
import "./GetCoveredPage.scss";
import Osmosis from "../../assets/Osmosis.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { mainnetChains, useAccount, useConnect, useDisconnect } from "graz";
import Navbar from "../../components/Navbar/Navbar";

function GetCovered() {
  const [activeTab, setActiveTab] = useState("allCovers");
  const tabsData = [
    {
      label: "All Covers",
    },
    {
      label: "My Covers",
    },
  ];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft - 30  ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth + 60 ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);


  const protocolsData = [
    {
      protocolName: "Osmosis",
      vulnerability: "Smart Contract Vulnerability",
      premiumPricing: "$10,000",
      coverProvided: "Up to $1,000,000",
      insuranceCapacity: "$50,000,000",
      icon: Osmosis,
    },
    {
      protocolName: "AssetMantle",
      vulnerability: "Protocol Exploit",
      premiumPricing: "$8,000",
      coverProvided: "Up to $500,000",
      insuranceCapacity: "$20,000,000",
      icon: Osmosis,
    },
    {
      protocolName: "Persistence",
      vulnerability: "Smart Contract Vulnerability",
      premiumPricing: "$5,000",
      coverProvided: "Up to $250,000",
      insuranceCapacity: "$10,000,000",
      icon: Osmosis,
    },
  ];
  return (
    <article className="getcovered">
      <Navbar />
      <section className="getcovered_coverssection">
        <div className=" getcovered_coverssection_header">
          <div className=" getcovered_coverssection_header_tabs">
            {console.log(tabsRef)}
            {tabsData.map((tab, idx) => {
              const isActive = idx === activeTabIndex;
              return (
                <button
                  key={idx}
                  ref={(el) => (tabsRef.current[idx] = el)}
                  className={`pt-2 pb-1 ${isActive ? "active-tab" : ""}`}
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <span
            className="absolute bottom-0 block h-0.5 bg-teal-500 transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </div>
        {activeTabIndex === 0 && (
          <div className="getcovered_coverssection_allcovers">
            {protocolsData.map((protocol, index) => (
              <div
                key={index}
                className="getcovered_coverssection_allcovers_card"
              >
                <div className="flex items-start">
                  <img className="w-12 mr-3 " src={protocol.icon} alt="protocol icon"/>
                  <div>
                  <h3 className="protocol-name">{protocol.protocolName}</h3>
                  <p className="vulnerability">{protocol.vulnerability}</p>
                  </div>
                </div>
                <div>
                  <div className="details">
                    <span className="details-label">Premium Pricing:</span>
                    <span className="details-value">
                      {protocol.premiumPricing}
                    </span>
                  </div>
                  <div className="details">
                    <span className="details-label">Cover Provided:</span>
                    <span className="details-value">
                      {protocol.coverProvided}
                    </span>
                  </div>
                  <div className="details">
                    <span className="details-label">Insurance Capacity:</span>
                    <span className="details-value">
                      {protocol.insuranceCapacity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

export default GetCovered;
