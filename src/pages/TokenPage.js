import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPriceHistory } from "../utils/utils";

function TokenPage() {
  let date = new Date();
  const [first, setfirst] = useState();
  let date1 = date.setDate(date.getDate() - 29);
  let str = date.toISOString().split("T")[0];
  const { chain, address } = useParams();

  const getHistory = () => {};
  useEffect(() => {
    getPriceHistory(chain, address, str).then((data) => {
      setfirst(data);
    });
  }, [chain, setfirst, address, str]);

  return (
    <div>
      <Navbar />
      {first?.prices && (
        <div className="w-1/2 mx-auto">
          {/* <Line
            data={{
              labels: first?.prices?.map((data) => data.date),
              datasets: [
                {
                  label: "user",
                  data: first?.prices?.map((data) => data.price),
                  backgroundColor: "red",
                },
              ],
            }}
          /> */}
        </div>
      )}
      {date.toLocaleString().split(",")[0].split("/").join("-")}
      {date.toISOString().split("T")[0]}
      {str}
    </div>
  );
}

export default TokenPage;
