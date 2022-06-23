import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
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
        className={` px-8 py-3 rounded text-slate-900 ${
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
          <div className="mt-10">
            <div className="flex mb-5 justify-between">
              <div className="flex">
                <div>
                  <h1>Asset</h1>
                </div>
              </div>
              <div>value</div>
            </div>
            {data &&
              pagedData.page.map((item) => {
                if (item.contract_name) {
                  if (item?.balance !== "0") {
                    return (
                      <a
                        href={`/token/${item.contract_address}`}
                        className="flex mb-5 bg-btn-color py-5 justify-between"
                      >
                        <div className="flex">
                          <div>
                            <h1>{`${item.contract_ticker_symbol} (${(
                              parseFloat(item.balance) /
                              10 ** item.contract_decimals
                            ).toFixed(2)})`}</h1>
                            <p>{item.quote_rate}</p>
                          </div>
                        </div>
                        <div>{parseFloat(item.quote).toFixed(4)}</div>
                      </a>
                    );
                  }
                }
              })}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            {pageBtns(pagedData.pages, setPage, page)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
