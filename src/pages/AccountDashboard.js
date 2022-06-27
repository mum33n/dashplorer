import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { getBalances, getTotalBalance } from "../utils/utils";
function paginate(items, max, page) {
  let numberOfPage = Math.ceil(items.length / max);
  let start = (page - 1) * max;
  let end = start + max;
  let paginated = items.slice(start, end);
  return { page: paginated, pages: numberOfPage };
}
function pageBtns(pages, state, current) {
  let btns = [];
  for (let i = 0; i < pages; i++) {
    btns.push(
      <button
        className={`px-8 py-3 rounded text-slate-900 ${
          current === i + 1 ? "bg-slate-200" : "bg-btnColor"
        }`}
        onClick={() => state(i + 1)}
      >
        {i + 1}
      </button>
    );
  }
  return btns;
}
function AccountDashboard() {
  const { account, chain } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    async function getData() {
      let data = await getBalances(chain, account);
      setData(data);
      let total1 = getTotalBalance(data);
      setTotal(total1);
    }
    getData();
  }, [account, chain]);
  let pagedData = paginate(data, 10, page);
  console.log(pagedData);
  return (
    <div>
      <Navbar />
      <div>
        <div className="bg-slate-900 h-[200px]"></div>
        <div className="bg-slate-400 ml-5 mt-[-65px] inline-block p-10 rounded-full">
          <AiOutlineUser className="text-6xl" />
        </div>
        <div className="px-10 text-white">{account}</div>
        <div className="bg-popOver w-[95%] mt-10 p-10 text-white mx-auto">
          <h1>Net Worth</h1>
          <div>$ {total}</div>
        </div>
        <div className="bg-popOver w-[95%] mt-10 p-10 text-white mx-auto">
          <div className="flex justify-between">
            <a href="/" className="text-center w-full">
              Portfollio
            </a>
          </div>
          <div className="mt-10 overflow-scroll">
            <table className=" mb-5 min-w-[600px] border-b w-full text-white">
              <thead className="bg-btnColor">
                <tr>
                  <th className="text-left p-5">Asset</th>
                  <th className="">Value</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {data &&
                  pagedData.page.map((item) => {
                    if (item.contract_name) {
                      if (item?.balance !== "0") {
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
                                    src={item.logo_url}
                                    width={"50px"}
                                    style={{ borderRadius: "50%" }}
                                  ></img>
                                )}
                                <div>
                                  <h1>{`${item.contract_ticker_symbol} (${(
                                    parseFloat(item.balance) /
                                    10 ** item.contract_decimals
                                  ).toFixed(2)})`}</h1>
                                  <p>{item.quote_rate}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="text-center">
                                {parseFloat(item.quote).toFixed(4)}
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            {pagedData.pages !== 1 && pageBtns(pagedData.pages, setPage, page)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
