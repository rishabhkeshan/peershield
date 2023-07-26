import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Osmosis from "../../assets/Osmosis.svg";
import NoCoversImage from "../../assets/nocovers.svg";
import { Link, useLocation } from "react-router-dom";
import CoverModal from "../../components/GetCoveredPage/CoverModal";
import "./ClaimsPage.scss";
import TableInstanceWithSearch from "./TableInstance";
import dummyDataAllClaims from "./dummyDataAllClaims.json";

export default function ClaimsPage() {
  const tabsData = [
    {
      label: "Open Claims",
    },
    {
      label: "Closed Claims",
    },
    {
      label: "My Claims",
    },
  ];
  const HOME_COLUMNS = [
    {
      Header: "Claim ID",
      accessor: "claimId",
      sticky: "left",
      Cell: ({ value }) => {
        return <p className="text-paragraph-2">{value}</p>;
      },
    },
    {
      Header: "Coverage Product",
      accessor: "coverageProduct",
      sticky: "left",
      Cell: ({ value }) => {
        return (
          <div className="text-left font-normal text-paragraph-2 flex flex-row justify-start ">
            <img src={Osmosis} className="mr-3 w-6" alt="loss" /> <p>{value}</p>
          </div>
        );
      },
    },
    {
      Header: "Claim Amount",
      accessor: "claimAmount",
      sticky: "left",
      Cell: ({ value }) => {
        return <p className="text-paragraph-2">{value}</p>;
      },
    },
    // {
    //   Header: "24h Change",
    //   accessor: "24hChange",
    //   sticky: "left",
    //   Cell: ({ value, row }) => {
    //     return value > 0 ? (
    //       <div className="text-success-color-400 text-left flex flex-row justify-start ">
    //         {/* <img src={GainIcon} className="mr-2" alt="gain" />{" "} */}
    //         <p className="text-paragraph-2">
    //           {value + "% "}
    //           {"(" + ((row.original.indexPrice * value) / 100).toFixed(2) + ")"}
    //         </p>
    //       </div>
    //     ) : (
    //       <div className="text-error-color-300 text-left flex flex-row justify-start ">
    //         {/* <img src={LossIcon} className="mr-2" alt="loss" />{" "} */}
    //         <p className="text-paragraph-2">
    //           {-value + "% "}
    //           {"(" +
    //             ((row.original.indexPrice * -value) / 100).toFixed(2) +
    //             ")"}
    //         </p>
    //       </div>
    //     );
    //   },
    // },

    {
      Header: "Status",
      accessor: "status",
      sticky: "left",
      Cell: ({ value }) => {
        return <p className="text-paragraph-2">{value}</p>;
      },
    },
    {
      Header: "Action",
      accessor: "action",
      sticky: "left",
      Cell: ({ value }) => {
        return (
          <div
            style={{
              background: "#161419",
              // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
              boxShadow: "rgb(10 10 10) 2px -2px 3px 1px",
              border: "0.5px solid #28272c",
            }}
            className="p-3 font-semibold text-center rounded-lg cursor-pointer"
          >
            {value}
          </div>
        );
      },
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);
  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft - 30 ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth + 60 ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  const protocolsData = [
    {
      protocolName: "Osmosis",
      vulnerability: "Smart Contract Vulnerability",
      premiumPricing: "$10,000",
      coverProvided: "Up to $1,000,000",
      insuranceCapacity: "$50,000,000",
      icon: Osmosis,
      APY: "9.6%",
    },
    {
      protocolName: "AssetMantle",
      vulnerability: "Protocol Exploit",
      premiumPricing: "$8,000",
      coverProvided: "Up to $500,000",
      insuranceCapacity: "$20,000,000",
      icon: Osmosis,
      APY: "18.3%",
    },
    {
      protocolName: "Persistence",
      vulnerability: "Smart Contract Vulnerability",
      premiumPricing: "$5,000",
      coverProvided: "Up to $250,000",
      insuranceCapacity: "$10,000,000",
      icon: Osmosis,
      APY: "13.5%",
    },
  ];
  const myAssessments = [];
  return (
    <div className="claims">
      <Navbar />
      <section className="claims_protocolssection">
        <div className=" claims_protocolssection_header">
          <div className=" claims_protocolssection_header_tabs">
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
            className="absolute bottom-0 block h-0.5 bg-white transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </div>
        {activeTabIndex === 0 && (
          <TableInstanceWithSearch
            tableData={dummyDataAllClaims}
            columnName={HOME_COLUMNS}
            title={"overview"}
          />
        )}
        {((activeTabIndex === 0 && protocolsData.length === 0) ||
          (activeTabIndex === 1 && myAssessments.length === 0)) && (
          <div className="no-covers-container">
            <img
              src={NoCoversImage}
              alt="No Covers"
              className="no-covers-image"
            />
            <p className="no-covers-text">No Covers Found</p>
          </div>
        )}
      </section>
      {isModalOpen && selectedCard && (
        <CoverModal
          cover={selectedCard}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
