import React, { useState } from "react";
import { containsObject, getBalances, negateState } from "../utils/utils.js";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { chains } from "../utils/availableChains.js";
import { useNavigate } from "react-router-dom";
import { useDatalayer } from "../hooks/datalayer.js";

function InputAdress({ toggle }) {
  const [{ accounts }, dispatch] = useDatalayer();
  const [formValue, setform] = useState({ blockchain: "1", wallet: "" });
  const History = useNavigate();
  function ChangeEvent(e) {
    const { name, value } = e.target;
    setform((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(formValue);
  }
  function submit() {
    let balances = getBalances(formValue.blockchain, formValue.wallet);
    if (formValue.blockchain && formValue.wallet && balances) {
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      let found = containsObject(formValue, accounts, "blockchain", "wallet");
      if (accounts) {
        if (!found) {
          // console.log(accounts.contais(formValue))
          localStorage.setItem(
            "accounts",
            JSON.stringify([...accounts, formValue])
          );
          dispatch({
            type: "setAccounts",
            accounts: JSON.parse(localStorage.getItem("accounts")),
          });
          negateState(toggle);
          History("/dashboard");
          // console.log(localStorage.getItem('accounts'))
        } else {
          alert("already exists");
        }
      } else {
        localStorage.setItem("accounts", JSON.stringify([formValue]));
        dispatch({
          type: "setAccounts",
          accounts: JSON.parse(localStorage.getItem("accounts")),
        });
      }
    } else {
      alert("add correct address");
    }
  }
  return (
    <div className="fixed top-0 left-0 bg-transparent  flex flex-col justify-center w-full h-[100vh]">
      <div className="container pt-5 text-white  pb-20 md:w-[40%] w-[90%] cursor-pointer mx-auto bg-bgColor px-10">
        <AiOutlineCloseCircle
          onClick={() => negateState(toggle)}
          className="text-white text-2xl ml-auto"
        />
        <div className="flex mt-10 flex-col items-center justify-center">
          <h1 className="mb-5">New Wallet</h1>
          <label className="mr-auto " for="blockchain">
            Blockchain
          </label>
          <select
            onChange={(e) => ChangeEvent(e)}
            id="blockchain"
            value={formValue.blockchain}
            name="blockchain"
            className="w-full text-black h-[40px]"
          >
            {chains.map((chain) => (
              <option value={chain.chain_id}>{chain.label}</option>
            ))}
          </select>

          <label className="mr-auto mt-5" for="address">
            Address
          </label>
          <input
            onChange={(e) => ChangeEvent(e)}
            id="address"
            value={formValue.wallet}
            name="wallet"
            placeholder="--Enter Wallet Address--"
            className="w-full text-black h-[40px]"
          ></input>
          <button
            onClick={() => submit()}
            className="bg-btnColor px-8 py-3 mt-5 rounded"
          >
            Add Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputAdress;
