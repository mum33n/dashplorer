import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventHashForm from "../components/eventHashForm";
import {
  getEventByContract,
  pageBtns,
  paginate,
  getEventByTopic,
} from "../utils/utils";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import EventContractForm from "../components/eventContractForm";

function Events() {
  let searchParams = new URLSearchParams(window.location.search);
  const [isloading, setLoading] = useState();
  const [page, setPage] = useState(1);

  let endBlock = searchParams.get("end");
  let startBlock = searchParams.get("start");
  let hashQuery = searchParams.get("hash");
  let contractAddress = searchParams.get("contract");
  let sender = searchParams.get("sender");
  let hash = hashQuery || contractAddress;
  let [data, setData] = useState([]);
  const { chain } = useParams();
  const defaultForm = {
    chain: chain,
    hash: hash,
    end: endBlock,
    start: startBlock,
    sender: sender,
  };
  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      if (contractAddress) {
        try {
          let data = await getEventByContract(
            chain,
            hash,
            startBlock,
            endBlock
          );
          setData(data.items);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else if (hashQuery) {
        try {
          let data = await getEventByTopic(
            chain,
            hash,
            startBlock,
            endBlock,
            sender
          );
          setData(data.items);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
      // {
      //   let data = await getEventByHash("1", hash, startBlock, endBlock);
      //   setData(data.items);
      // }
    }
    getDetails();
  }, [hashQuery, hash, chain, contractAddress, endBlock, sender, startBlock]);
  let pag = paginate(data, 10, page);
  return (
    <div>
      <Navbar />
      {hashQuery && <EventHashForm values={defaultForm} />}
      {contractAddress && <EventContractForm values={defaultForm} />}
      <div className="overflow-scroll md:overflow-hidden p-5">
        <table className="border-collapse border min-w-[700px] border-slate-400 w-full text-white">
          <thead className="bg-btnColor">
            <tr>
              <th className="border border-slate-300 py-5">Transaction Hash</th>
              <th className="border border-slate-300">Time</th>
              <th className="border border-slate-300">Block Height</th>
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
                    {item.block_height}
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
        {data.length === 0 && !isloading && (
          <div className="text-center text-white py-5 text-3xl">
            No event found{" "}
          </div>
        )}
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
