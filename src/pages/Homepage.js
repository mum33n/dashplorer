import React, { useState } from "react";
import { negateState } from "../utils/utils";
import InputAdress from "../components/InputAdress";
import Navbar from "../components/Navbar";
import { useDatalayer } from "../hooks/datalayer";
import InputHash from "../components/InputHash";
import InputContract from "../components/InputContract";

function Homepage() {
  const [inputAddress, setInput] = useState();
  const [inputHash, setHash] = useState();
  const [inputContract, setContract] = useState();
  const [{ accounts }, dispatch] = useDatalayer();
  console.log(accounts);
  return (
    <div className="pb-10">
      <Navbar />
      <div className="pt-20 px-5 md:w-[50%]">
        <div className="pt-20">
          <h1 className="text-5xl text-white font-bold">
            Your home to <span className="text-btnColor">Web3</span>
          </h1>
          <p className=" text-xl mt-5 text-white">
            Manage your entire web3 portfollio from DeFi to NFTs and whatever
            comes next. Invest in the latest oppportunities from one convenient
            place.
          </p>
          <div className="pt-5 flex gap-3 flex-wrap">
            <a href="#explore" className="bg-btnColor px-8 py-3 rounded">
              Explore
            </a>
            {accounts ? (
              <a href="/dashboard" className="bg-btnColor px-8 py-3 rounded">
                Go to dashboard
              </a>
            ) : (
              <button
                onClick={() => negateState(setInput)}
                className="bg-btnColor px-8 py-3 ml-5 rounded"
              >
                Enter Address
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="explore" className="mt-20 pt-20 px-5">
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          Explore
        </h1>
        <div className="text-white text-xl text-center">
          Explore transactions from the blockchain of your choice by hashes or
          contract address over a block range{" "}
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-5 mb-20">
          <button
            onClick={() => {
              negateState(setContract);
            }}
            className="bg-btnColor px-8 py-3 rounded"
          >
            By Contract Address
          </button>
          <button
            onClick={() => {
              negateState(setHash);
            }}
            className="bg-btnColor px-8 py-3 rounded"
          >
            By Hashes
          </button>
        </div>
      </div>
      {inputAddress && <InputAdress toggle={setInput} />}
      {inputHash && <InputHash toggle={setHash} />}
      {inputContract && <InputContract toggle={setContract} />}
    </div>
  );
}

export default Homepage;
