import React from "react";
import { useParams } from "react-router-dom";

function Navbar() {
  let dashboard = window.location.pathname;
  console.log(dashboard);
  return (
    <div className="bg-popOver p-5 flex iems-center shadow-md justify-between">
      <h1 className="text-white text-2xl font-bold">
        <a href="/">DASHPLORER</a>
      </h1>
      <div></div>
    </div>
  );
}

export default Navbar;
