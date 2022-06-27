import React, { useState } from "react";
import { chains } from "../utils/availableChains";

function EventContractForm({ values }) {
  let [formValue, setForm] = useState({
    blockchain: values.chain,
    CA: values.hash,
    start: values.start,
    end: values.end,
  });
  function changeHandler(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function submitHandler() {
    const { blockchain, CA, start, end } = formValue;
    if ((blockchain, CA, start, end)) {
      window.location.href = `http://localhost:3000/${blockchain}/events?contract=${CA}&start=${start}&end=${end}`;
    } else {
      alert("fill all entries");
    }
  }
  return (
    <div className="p-5">
      <div className=" flex gap-3 flex-wrap items-center">
        <label className="mr-auto text-white mt-5">
          Blockchain
          <select
            onChange={(e) => changeHandler(e)}
            id="blockchain"
            name="blockchain"
            value={formValue.blockchain}
            className="w-full text-slate-900 h-[40px]"
          >
            {chains.map((chain) => (
              <option key={chain.label} value={chain.chain_id}>
                {chain.label}
              </option>
            ))}
          </select>
        </label>

        <label className="mr-auto text-white mt-5">
          Contract Address
          <input
            onChange={(e) => changeHandler(e)}
            name="CA"
            placeholder="--Enter Contract Address--"
            className="w-full text-slate-900 h-[40px] px-2"
            value={formValue.CA}
          ></input>
        </label>
        <label className="mr-auto text-white mt-5">
          Starting
          <input
            onChange={(e) => changeHandler(e)}
            name="start"
            placeholder="--Enter Starting Block--"
            className="w-full text-slate-900 h-[40px] px-2"
            value={formValue.start}
          ></input>
        </label>
        <label className="mr-auto text-white mt-5">
          End
          <input
            onChange={(e) => changeHandler(e)}
            name="end"
            placeholder="--Enter Ending Block--"
            className="w-full text-slate-900 h-[40px] px-2"
            value={formValue.end}
          ></input>
        </label>
      </div>
      <button
        onClick={() => submitHandler()}
        className="bg-btnColor py-3 px-7 rounded mt-6"
      >
        Search
      </button>
    </div>
  );
}

export default EventContractForm;
