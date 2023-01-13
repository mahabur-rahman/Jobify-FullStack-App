import React, { useEffect } from "react";
import { StatsContainer } from "../../components";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { showStats } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);
  return (
    <>
      <StatsContainer />
    </>
  );
};

export default Stats;
