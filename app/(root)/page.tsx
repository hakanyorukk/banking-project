import HomeContent from "@/components/HomeContent";
import RightSideBar from "@/components/RightSideBar";
import React from "react";

const page = () => {
  return (
    <section className="flex ">
      <div className="w-full h-full">
        <HomeContent />
      </div>
      <div className="basis-96 border-l-2 border-color bg-slate-50 dark:bg-slate-800 relative">
        <RightSideBar />
      </div>

      {/* <Spinner /> */}
    </section>
  );
};

export default page;
