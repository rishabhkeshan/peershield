import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./StakePage.scss";
import sPeer from "../../assets/sPeer.svg";
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

const peerContractAddress =
  "osmo1069f56wca7c5n37at4g4x4lqykxctngel4zp3h0xhnh9jcdfvmasffxn9v";
const sPeerContractAddress =
  "osmo1rwnuumqwususgydvt39zj3zuk8czlwsssvyw5tx2mxc8m84vse3se2nf09";
const osmosisRPC = "https://rpc.osmotest5.osmosis.zone";

export default function StakePage() {
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { executeContract } = useExecuteContract({ peerContractAddress });
  const { data } = useSigningClients();
  const [stakeInput, setStakeInput] = useState("0");
  const [stakedTokens, setStakedTokens] = useState("0");
  const [peerTokens, setPeerTokens] = useState("0");

  useEffect(() => {
    if (account) {
      getStakedTokens();
      getPeerTokens();
    }
  }, [account]);

  const getStakedTokens = async () => {
    const client = await CosmWasmClient.connect(osmosisRPC);
    const query = {
      balance: {
        address: account.bech32Address,
      },
    };
    const tx = await client.queryContractSmart(sPeerContractAddress, query);
    setStakedTokens(tx.balance);
  };
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

  const onClick = async () => {
    try {
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
      "stake_p_token": {
        "recipient": "${account.bech32Address}"
      }
    }`;
      const encodedMsg = btoa(receipient);
      console.log(encodedMsg);
      console.log(stakeInput);
      const query = {
        send: {
          amount: stakeInput,
          contract:
            "osmo1rwnuumqwususgydvt39zj3zuk8czlwsssvyw5tx2mxc8m84vse3se2nf09",
          msg: encodedMsg,
        },
      };
      const tx = await client.execute(
        account.bech32Address,
        peerContractAddress,
        query,
        "auto"
      );
      console.log(tx);
      getStakedTokens();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="stake">
      <Navbar />
      <div className="stake_cardcontainer">
        <div className="stake_cardcontainer_card">
          <div className="stake_cardcontainer_card_title">Staked Token</div>
          <div className="stake_cardcontainer_card_amountcontainer">
            <div className="stake_cardcontainer_card_amountcontainer_text">
              {stakedTokens}
            </div>
            <img src={sPeer} alt="speer" className="h-8" />
          </div>
          <div className="h-16">
            <input
              placeholder="Enter amount of token"
              className="stake_cardcontainer_card_inputcontainer_input"
              value={stakeInput}
              onChange={(e) => {
                setStakeInput(e.target.value);
              }}
            />
          </div>
          <div className="stake_cardcontainer_card_buttoncontainer">
            <div
              onClick={onClick}
              className="stake_cardcontainer_card_buttoncontainer_button"
            >
              Stake
            </div>
            <div
              style={{ pointerEvents: "none", opacity: "0.5" }}
              className="stake_cardcontainer_card_buttoncontainer_button"
            >
              Unstake
            </div>
          </div>
        </div>
        <div className="stake_cardcontainer_card">
          <div
            onClick={getStakedTokens}
            className="stake_cardcontainer_card_title"
          >
            Claimable Token
          </div>
          <div className="stake_cardcontainer_card_amountcontainer">
            <div className="stake_cardcontainer_card_amountcontainer_text">
              0
            </div>
            <img src={sPeer} alt="speer" className="h-6" />
          </div>
          <div className="h-16"></div>
          <div className="stake_cardcontainer_card_buttoncontainer">
            <div className="stake_cardcontainer_card_buttoncontainer_button">
              Claim
            </div>
            <div className="stake_cardcontainer_card_buttoncontainer_button">
              Restake
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
