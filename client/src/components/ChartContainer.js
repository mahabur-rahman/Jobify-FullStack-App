import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";

const ChartContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplications: data } = useAppContext();

  return (
    <>
      <h2>Monthly Applications</h2>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? `Area Chart` : `Bar Chart`}
      </button>

      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </>
  );
};

export default ChartContainer;
