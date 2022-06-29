import React, { useCallback, useEffect, useState } from "react";
import { useDatalayer } from "../hooks/datalayer";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";
import {
  chainMap,
  getBalances,
  negateState,
  shortenAddress,
} from "../utils/utils";
import InputAdress from "./InputAdress";
// import DashboardTable from "./DashboardTable";

function DashboardBox() {
  const [inputAddress, setInput] = useState();
  const [{ accounts }, dispatch] = useDatalayer();
  let total = 0;
  console.log(accounts[0]);
  const [dashboard, setDashBoard] = useState([]);

  const removeAccount = useCallback(
    (index) => {
      accounts.splice(index, 1);
      localStorage.setItem("accounts", JSON.stringify([...accounts]));
      dispatch({
        type: "setAccounts",
        accounts: accounts,
      });
      window.location.reload();
    },
    [accounts, dispatch]
  );

  const getDash = useCallback(
    (accounts) => {
      let aggregate = [];
      accounts.map((item) => {
        let chain = item?.blockchain;
        let address = item?.wallet;
        let AggObj = { chain: chain, address: address };
        let total = 1;
        AggObj.total = total;
        aggregate.push(AggObj);
      });

      setDashBoard(aggregate);
    },
    [accounts]
  );
  const getTotal = useCallback(async (chain, address) => {
    let data = await getBalances(chain, address);
    return data;
  }, []);

  useEffect(() => {
    getDash(accounts);
  }, [getDash, accounts]);
  // useEffect(() => {
  //   let items = [];
  //   accounts.map((item) => {
  //     getTotal(item.blockchain, item.wallet).then((item) => {
  //       items.push(item);
  //     });
  //     console.log(Array(items)[0][0]);
  //   });
  // }, [accounts]);

  return (
    <div className="mt-5">
      <div className="bg-popOver h-max-[400px] text-white w-[90%] mx-auto p-3 md:p-10 shadow-lg">
        <div className="flex mb-5">
          <div className="md:w-[60%] w-[40%]">Name</div>
          <div className="md:w-[20%] w-[30%]">Blockchain</div>
          <div className="md:w-[20%] w-[30%] "></div>
        </div>
        <div>
          {dashboard.map((item, ind) => {
            total += item.price;
            return (
              <div className="flex mt-5">
                <a
                  href={`/accounts/${item.chain}/${item.address}`}
                  className="md:w-[60%] w-[40%]"
                >
                  <div>{shortenAddress(item.address)}</div>
                </a>
                <div className="md:w-[20%] w-[30%] ">
                  {chainMap.get(item?.chain)?.label?.slice(0, 7)}...
                </div>
                <div className="md:w-[20%] w-[30%] ">
                  <AiOutlineClose
                    onClick={() => removeAccount(ind)}
                    className="text-red-500 font-bold text-xl cursor-pointer"
                  ></AiOutlineClose>
                </div>
              </div>
            );
          })}
        </div>
        <AiFillPlusCircle onClick={() => negateState(setInput)} />
      </div>
      {/* <div className="bg-popOver mt-10 text-white w-[90%] rounded-lg mx-auto p-10 shadow-lg">
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
      </div> */}
      {inputAddress && <InputAdress toggle={setInput} />}
    </div>
  );
}

export default DashboardBox;
