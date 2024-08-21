import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex h-screen w-full place-items-center justify-center text-slate-500 dark:text-slate-300">
      <FaSpinner className="animate-spin text-7xl" />
    </div>
  );
};

export default Spinner;
