import React, { useEffect, useState } from "react";
import { useDatalayer } from "../hooks/datalayer";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  chainMap,
  getAggregate,
  negateState,
  shortenAddress,
} from "../utils/utils";
import InputAdress from "./InputAdress";

function DashboardBox() {
  const [inputAddress, setInput] = useState();
  const [{ accounts, dashboard }, dispatch] = useDatalayer();
  let total = 0;
  const [DashBoard, setDashBoard] = useState([]);
  useEffect(() => {
    async function getDash() {
      const dashboard = await getAggregate(accounts);
      dispatch({ type: "setDashboard", dashboard: dashboard });
      console.log(dashboard);
    }
    getDash();
  }, [accounts]);

  console.log(dashboard);

  return (
    <div className="mt-5">
      <div className="bg-popOver h-max-[400px] text-white w-[90%] mx-auto p-3 md:p-10 shadow-lg">
        <div className="flex mb-5">
          <div className="md:w-[60%] w-[40%]">Name</div>
          <div className="md:w-[20%] w-[30%]">Blockchain</div>
          <div className="md:w-[20%] w-[30%] ">{"Bal. (USD)"}</div>
        </div>
        <div>
          {dashboard.map((item) => {
            console.log(item.price);
            total += item.price;
            return (
              <div className="flex">
                <a
                  href={`/accounts/${item.chain}/${item.address}`}
                  className="md:w-[60%] w-[40%]"
                >
                  <div>{shortenAddress(item.address)}</div>
                </a>
                <div className="md:w-[20%] w-[30%] ">
                  {chainMap.get(item.chain).label.slice(0, 7)}...
                </div>
                <div className="md:w-[20%] w-[30%] ">
                  {/* {item.total?.toFixed(3)} */}
                </div>
              </div>
            );
          })}
        </div>
        <AiFillPlusCircle onClick={() => negateState(setInput)} />
      </div>
      <div className="bg-popOver mt-10 text-white w-[90%] rounded-lg mx-auto p-10 shadow-lg">
        <div className="flex mb-5">
          <div className="md:w-[60%] w-[40%]">Total Balance</div>
        </div>
        <div className="flex">
          <div>$ {0}</div>
        </div>
      </div>
      <div className="bg-popOver mt-10 text-white w-[90%] rounded-lg mx-auto p-10 shadow-lg">
        <div className="flex mb-5">
          <div className="md:w-[60%] w-[40%]">Chart</div>
        </div>
        <div className="flex">
          <div>$500</div>
        </div>
      </div>
      {inputAddress && <InputAdress toggle={setInput} />}
    </div>
  );
}

export default DashboardBox;
