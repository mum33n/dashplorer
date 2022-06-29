import React, { useState } from "react";
import logo from "../assets/logo.png";
function DashboardTable({ items }) {
  const [first, setfirst] = useState(items);
  return (
    <div className="overflow-scroll">
      <table className=" mb-5 min-w-[600px] border-b w-full text-white">
        <thead className="bg-btnColor">
          <tr>
            <th className="text-left p-5"></th>
            <th className="">Value</th>
          </tr>
        </thead>
        <tbody className="p-5">
          {first &&
            items.map((item) => {
              return (
                <tr className="border-slate-400 border-b">
                  <td className="p-5">
                    <div className="flex gap-2">
                      {item.logo_url && (
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = logo;
                          }}
                          src="eee"
                          width={"50px"}
                          style={{ borderRadius: "50%" }}
                        ></img>
                      )}
                      <div>
                        <h1>{`${item.address}`}</h1>
                        <p>{item.chain}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      {parseFloat(item.total).toFixed(4)}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
