import React, { useEffect } from "react";
import { ChartContainer, StatsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />

      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
};

export default Stats;
