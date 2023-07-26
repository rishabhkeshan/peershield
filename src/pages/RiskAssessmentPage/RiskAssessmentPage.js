import React, { useState, useEffect, useRef } from "react";
import "./RiskAssessmentPage.scss";
import Osmosis from "../../assets/Osmosis.svg";
import MyCover from "../../assets/MyCoverIcon.svg";
import NoCoversImage from "../../assets/nocovers.svg";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CoverModal from "../../components/GetCoveredPage/CoverModal";
import { CosmWasmClient } from "cosmwasm";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { useAccount, useConnect, useDisconnect } from "graz";

import { useExecuteContract } from "graz";
import {
  AminoTypes,
  BroadcastTxError,
  SignerData,
  SigningStargateClient,
  StdFee,
} from "@cosmjs/stargate";
import { useSigningClients } from "graz";
import { osmosis } from "graz/chains";

const peerContractAddress =
  "osmo1069f56wca7c5n37at4g4x4lqykxctngel4zp3h0xhnh9jcdfvmasffxn9v";
const sPeerContractAddress =
  "osmo1rwnuumqwususgydvt39zj3zuk8czlwsssvyw5tx2mxc8m84vse3se2nf09";

const riskAssessmentContractAddress =
  "osmo1qtyf2v9q8e69c373f3g7gwlax4d68cjqkkp9krwpuzttvq6pp29s4qdx0r";
const osmosisRPC = "https://rpc.osmotest5.osmosis.zone";

function RiskAssessment() {
  const [riskInputs, setRiskInputs] = useState([]);

  const [pools, setPools] = useState([]);
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  useEffect(() => {
    if (account) getPools();
  }, [account]);
  const handleRiskInputChange = (index, value) => {
    setRiskInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };
  const getPools = async () => {
    const client = await CosmWasmClient.connect(osmosisRPC);
    const query = {
      list: {},
    };
    const tx = await client.queryContractSmart(
      riskAssessmentContractAddress,
      query
    );
    console.log(tx.risk_assessments);
    const pools = tx.risk_assessments;
    const allData = [];
    const inputs = [];
    for (let i = 0; i < tx.risk_assessments.length; i++) {
      const indiQuery = {
        list_risk_assessment: {
          id: pools[i],
        },
      };
      const tx = await client.queryContractSmart(
        riskAssessmentContractAddress,
        indiQuery
      );
      allData.push(tx);
      inputs.push("");
    }
    setPools(allData);
    setRiskInputs(inputs);
    console.log(allData);
  };

  const onClick = async (card, riskInput) => {
    try {
      // console.log(clientExecute);

      const chainId = "osmo-test-5";
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      console.log(SigningCosmWasmClient);
      const client = await SigningCosmWasmClient.connectWithSigner(
        osmosisRPC,
        offlineSigner,
        {
          gasPrice: GasPrice.fromString("0.01osmo"),
        }
      );
      console.log(client);

      const receipient = `{
      "stake_risk_assessment": {
        "id": "${card.id}",
        "recipient": "${account.bech32Address}"
      }
    }`;
      const encodedMsg = btoa(receipient);
      console.log(encodedMsg);
      console.log(riskInput);
      const query = {
        cw20_message: {
          send: {
            amount: riskInput,
            contract:
              "osmo1qtyf2v9q8e69c373f3g7gwlax4d68cjqkkp9krwpuzttvq6pp29s4qdx0r",
            msg: encodedMsg,
          },
        },
      };
      const tx = await client.execute(
        account.bech32Address,
        sPeerContractAddress,
        query,
        "auto"
      );
      console.log(tx);
      getPools();
    } catch (err) {
      console.log(err);
    }
  };
  const [activeTab, setActiveTab] = useState("allCovers");
  const tabsData = [
    {
      label: "All",
    },
    {
      label: "My Assesments",
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
      setTabUnderlineLeft(currentTab?.offsetLeft - 30 ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth + 60 ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card, index) => {
    setSelectedCard(card);
    const riskInput = riskInputs[index];
    onClick(card, riskInput);
    // setIsModalOpen(true);
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
    <article className="riskassessment">
      <Navbar />
      <section className="riskassessment_protocolssection">
        <div className=" riskassessment_protocolssection_header">
          <div className=" riskassessment_protocolssection_header_tabs">
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
          <div className="riskassessment_protocolssection_allcovers">
            {pools.map((protocol, index) => (
              <div
                key={index}
                className="riskassessment_protocolssection_allcovers_card"
              >
                <div className="flex items-start">
                  <img
                    className="w-12 mr-3 "
                    src={Osmosis}
                    alt="protocol icon"
                  />
                  <div>
                    <h3 className="protocol-name">{protocol?.id}</h3>
                    <p className="vulnerability">
                      {"Smart Contract Vulnerability"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="details">
                    <span className="details-label">Pool Threshold Value:</span>
                    <span className="details-value">{`${protocol?.total}/50`}</span>
                  </div>
                  <div className="details">
                    <span className="details-label">Insurance Capacity:</span>
                    <span className="details-value">{"$15000"}</span>
                  </div>
                </div>
                <div className="flex w-full items-end justify-end gap-3">
                  {protocol?.total <= 50 && (
                    <input
                      placeholder="Enter amount of token"
                      className="underwrite_input"
                      value={riskInputs[index]} // Use the individual risk input for the current card
                      onChange={(e) =>
                        handleRiskInputChange(index, e.target.value)
                      }
                    />
                  )}
                  {protocol?.total >= 50 ? (
                    <div
                      onClick={() => handleCardClick(protocol, index)}
                      className="underwrite_button passed"
                    >
                      PASSED
                    </div>
                  ) : (
                    <div
                      onClick={() => handleCardClick(protocol, index)}
                      className="underwrite_button"
                    >
                      UNDERWRITE
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
    </article>
  );
}

export default RiskAssessment;
