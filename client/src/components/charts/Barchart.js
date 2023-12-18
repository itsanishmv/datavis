import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// ChartJS.register(BarElement);
function Barchart() {
  const [graphData, setGraphData] = useState([]);
  console.log(graphData);
  const options = {
    type: "bar",
    indexAxis: "y",
    scales: {
      x: {
        border: {
          color: "#FFFFFF",
        },
      },
      y: {
        border: {
          color: "#FFFFFF",
        },
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        labels: "369",
        data: graphData.map((item) => item.slice(3)),
        backgroundColor: ["#F0C3F1"],
      },
    ],
  };
  async function getData() {
    const response = await fetch("http://localhost:3000/sheets");
    const data = await response.json();
    setGraphData(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" w-[500px] h-[500px] borde-2 border-red-400 ">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Barchart;
