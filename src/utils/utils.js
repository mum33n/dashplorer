import axios from "axios";
import { chains } from "./availableChains";
const apiKey = "ckey_81ff9589897446c5be350364dc7";

export function shortenAddress(address) {
  return `${address?.slice(0, 6)}...${address?.slice(-3)}`;
}
export function getTotalBalance(data) {
  let total = 0;
  for (let datum of data) {
    total += parseFloat(datum.quote);
  }
  return total;
}
export const getAddressHistory = async (address, chain) => {
  let addressHistory = await axios
    .get(
      `https://api.covalenthq.com/v1/${chain}/address/${address}/transactions_v2/?&key=${apiKey}`
    )
    .then((res) => res)
    .then((data) => data.data)
    .then((value) => value.data.items);
  return addressHistory;
};

export const negateState = (callback) => {
  callback((value) => !value);
};
export const getBalances = async (chainId, address) => {
  const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${apiKey}`;
  const response = await axios
    .get(endpoint)
    .then((res) => res)
    .then((data) => data.data)
    .then((value) => value.data.items);
  return response;
};
export const getPortfolio = async (chainId, address) => {
  const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${address}/portfolio_v2/?key=${apiKey}`;
  const response = await axios
    .get(endpoint)
    .then((res) => res)
    .then((data) => data.data);
  return response;
};
export const getPrice = async (chainId, address) => {
  const endpoint = `https://api.covalenthq.com/v1/historical_by_addresses_v2/${chainId}/address/${address}/?&key=${apiKey}`;
  const response = await axios
    .get(endpoint)
    .then((res) => res)
    .then((data) => data.data);
  return response;
};
export function containsObject(obj, list, key1, key2) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i][key1] === obj[key1] && list[i][key2] === obj[key2]) {
      return true;
    }
  }

  return false;
}

function createArrayMap(array, id) {
  let map = new Map();
  array.map((item) => map.set(item[id], item));
  return map;
}

export const chainMap = createArrayMap(chains, "chain_id");
export async function getAccountInfo(chain, address) {
  let chainInfo = chainMap.get(chain);
  let balances = await getBalances(chain, address);
  let total = 0;
  for (let i = 0; i < balances.length; i++) {
    total += balances[i].quote;
  }
  let finalObject = {
    chain: chainInfo,
    total: total,
  };
  return finalObject;
}
export async function getAggregate(accounts) {
  let aggregate = [];
  accounts.map(async (item) => {
    let chain = item.blockchain;
    let address = item.wallet;
    let AggObj = { chain: chain, address: address };
    let prices = [];

    async function setDetails() {
      let data = await getAccountInfo(chain, address);
      return data.total;
    }
    let price = await setDetails();
    AggObj.total = price;
    aggregate.push(AggObj);
  });
  return aggregate;
}
// export function getAggregate(accounts) {
//   let aggregate = [];
//   accounts.map(async (item) => {
//     let chain = item.blockchain;
//     let address = item.wallet;
//     let AggObj = { chain: chain, address: address };
//     let price;

//     async function setDetails(update) {
//       let data = await getAccountInfo(chain, address);
//       update += data;
//     }
//     setDetails(price);
//     console.log(price);
//     AggObj.total = price;
//     aggregate.push(AggObj);
//   });
//   console.log(aggregate);
//   return aggregate;
// }
//
export async function getEventByTopic(chain, hash, start, end, sender) {
  let data = await axios
    .get(
      `https://api.covalenthq.com/v1/${chain}/events/topics/${hash}/?starting-block=${start}&ending-block=${end}&sender-address=${sender}&key=${apiKey}`
    )
    .then((res) => res.data)
    .then((data) => data.data);
  return data;
}

export async function getEventByContract(chain, hash, start, end) {
  let data = await axios
    .get(
      `https://api.covalenthq.com/v1/${chain}/events/address/${hash}/?starting-block=${start}&ending-block=${end}&key=${apiKey}`
    )
    .then((res) => res.data)
    .then((data) => data.data);
  return data;
}
export function paginate(items, max, page) {
  let numberOfPage = Math.ceil(items.length / max);
  let start = (page - 1) * max;
  let end = start + max;
  let paginated = items.slice(start, end);
  return { page: paginated, pages: numberOfPage };
}
export function pageBtns(pages, state, current) {
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

export async function getPriceHistory(chain, address, start) {
  let data = await axios
    .get(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chain}/USD/${address}/?quote-currency=USD&format=JSON&from=${start}&key=${apiKey}`
    )
    .then((res) => res.data)
    .then((data) => data.data);
  return data;
}

export async function getTransactions(chain, address) {
  let data = await axios
    .get(
      `https://api.covalenthq.com/v1/${chain}/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=${apiKey}`
    )
    .then((res) => res.data)
    .then((data) => data.data);
  return data;
}
