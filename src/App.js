import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import AccountDashboard from "./pages/AccountDashboard";
import Events from "./pages/Events";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { chainMap, getBalances, getPortfolio, getPrice } from "./utils/utils";

function App() {
  return (
    <div className="bg-bgColor app">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route
          path="accounts/:chain/:account"
          element={<AccountDashboard />}
        ></Route>
        <Route path="/:chain/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
