import React, { useEffect, useState } from "react";
import { getTransactions } from "../utils/utils";

function HistoryTable({ chain, address }) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getTransactions(chain, address).then((res) => {
      setHistory(res);
    });
  }, [chain, address]);
  return (
    <div>
      <div className="mt-10 overflow-scroll">
        <table className=" mb-5 min-w-[600px] border-b w-full text-white">
          <thead className="bg-btnColor">
            <tr>
              <th className="text-left p-5">Asset</th>
              <th className="">Value</th>
              <th className="">Value</th>
              <th className="">Value</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {history?.items?.map((item) => {
              return (
                <tr className="border-slate-400 border-b">
                  <td className="p-5">
                    <div className="flex gap-2">
                      <div>Hello</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">Hello</div>
                  </td>
                  <td>
                    <div className="text-center">Hello</div>
                  </td>
                  <td>
                    <div className="text-center">Hello</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
