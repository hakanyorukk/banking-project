import React from "react";
import Logo from "./Logo";
import SideNavigation from "./SideNavigation";

const SideBar = () => {
  return (
    <section className="h-screen w-80 border-r border-color bg-slate-50 dark:bg-slate-800 sticky top-0 ">
      <Logo />
      <SideNavigation />
    </section>
  );
};

export default SideBar;
