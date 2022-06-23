import React, { useEffect, useState } from "react";
import { chains } from "../utils/availableChains";
import Navbar from "../components/Navbar";
import { getEventByHash, pageBtns, paginate } from "../utils/utils";
import Spinner from "../components/Spinner";

function Events() {
  let searchParams = new URLSearchParams(window.location.search);
  const [isloading, setLoading] = useState();
  const [page, setPage] = useState(1);
  let endBlock = searchParams.get("end");
  let startBlock = searchParams.get("start");
  let hash = searchParams.get("hash");
  let [data, setData] = useState([]);
  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      let data = await getEventByHash("1", hash, startBlock, endBlock);
      setData(data.items);
      setLoading(false);
    }
    getDetails();
  }, []);
  let pag = paginate(data, 10, page);
  return (
    <div>
      <Navbar />
      <div className="p-5 flex items-center">
        <label className="mr-auto text-white mt-5">
          Blockchain
          <select
            id="blockchain"
            name="blockchain"
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
            name="CA"
            placeholder="--Enter Contract Address--"
            className="w-full text-slate-900 h-[40px]"
          ></input>
        </label>
        <label className="mr-auto text-white mt-5">
          Starting
          <input
            name="start"
            placeholder="--Enter Starting Block--"
            className="w-full text-slate-900 h-[40px]"
          ></input>
        </label>
        <label className="mr-auto text-white mt-5">
          End
          <input
            name="end"
            placeholder="--Enter Ending Block--"
            className="w-full h-[40px]"
          ></input>
        </label>
      </div>
      <div className="overflow-scroll p-5">
        <table className="border-collapse border border-slate-400 w-full text-white">
          <thead className="bg-btnColor">
            <tr>
              <th className="border border-slate-300 py-5">Transaction Hash</th>
              <th className="border border-slate-300">Time</th>
              <th className="border border-slate-300 ">Sender's Address</th>
              <th className="border border-slate-300 ">Method</th>
            </tr>
          </thead>
          <tbody>
            {pag.page.map((item) => {
              return (
                <tr>
                  <td className="border border-slate-300 p-5 text-center">
                    {item.tx_hash}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {item.block_signed_at}
                  </td>
                  <td className="border border-slate-300 tex-center">
                    {item.sender_address}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {item.decoded.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-5 flex gap-3 justify-center">
          {pageBtns(pag.pages, setPage, page)}
        </div>
      </div>
      {isloading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Events;
