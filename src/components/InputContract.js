import React, { useState } from "react";
import { negateState } from "../utils/utils.js";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { chains } from "../utils/availableChains.js";
import { useNavigate } from "react-router-dom";

function InputContract({ toggle }) {
  const [formValue, setform] = useState({ blockchain: "1", wallet: "" });
  const History = useNavigate();
  function ChangeEvent(e) {
    const { name, value } = e.target;
    setform((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function submit() {
    if (
      formValue.blockchain &&
      formValue.CA &&
      formValue.start &&
      formValue.end
    ) {
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      if (accounts) {
        negateState(toggle);
        History(
          `/${formValue.blockchain}/events?contract=${formValue.CA}&start=${formValue.start}&end=${formValue.end}`
        );
        // console.log(localStorage.getItem('accounts'))
      }
    } else {
      alert("add correct address");
    }
  }
  return (
    <div className="fixed top-0 left-0 text-white bg-transparent  flex flex-col justify-center w-full h-[100vh]">
      <div className="container pt-5  pb-20 md:w-[40%] w-[90%] cursor-pointer mx-auto bg-bgColor px-5 md:px-10">
        <AiOutlineCloseCircle
          onClick={() => negateState(toggle)}
          className="text-white text-2xl ml-auto"
        />
        <div className="flex mt-10 flex-col items-center justify-center">
          <h1 className="mb-5 text-white">Events by Contract Address</h1>
          <label className="w-full mr-auto">
            Blockchain
            <select
              onChange={(e) => ChangeEvent(e)}
              id="blockchain"
              value={formValue.blockchain}
              name="blockchain"
              className="w-full text-black h-[40px]"
            >
              {chains.map((chain) => (
                <option key={chain.label} value={chain.chain_id}>
                  {chain.label}
                </option>
              ))}
            </select>
          </label>

          <label className="w-full mr-auto mt-5">
            Contract Address
            <input
              onChange={(e) => ChangeEvent(e)}
              value={formValue.CA}
              name="CA"
              placeholder="--Enter Contract Address--"
              className="w-full h-[40px] text-black"
            ></input>
          </label>
          <label className="w-full mr-auto mt-5">
            Starting
            <input
              onChange={(e) => ChangeEvent(e)}
              value={formValue.start}
              name="start"
              placeholder="--Enter Starting Block--"
              className="text-black w-full h-[40px]"
            ></input>
          </label>
          <label className="w-full mr-auto mt-5">
            End
            <input
              onChange={(e) => ChangeEvent(e)}
              value={formValue.end}
              name="end"
              placeholder="--Enter Ending Block--"
              className="w-full text-black h-[40px]"
            ></input>
          </label>
          <button
            onClick={() => submit()}
            className="bg-btnColor px-8 py-3 mt-5 rounded"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputContract;
