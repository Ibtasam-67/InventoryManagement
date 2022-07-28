import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <Rings color="#00BFFF" height={400} width={1500} />
    </div>
  );
};

export default Loader;
