import Link from "next/link";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <div className="flex h-fit w-full border-b border-color bg-slate-50 dark:bg-slate-800 dark:text-slate-200 sticky top-0">
      <nav className="flex w-full justify-end ">
        <ul className="flex gap-8 mr-10 items-center text-2xl font-light py-2 ">
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <button className="text-2xl flex items-center">
              <IoMdNotificationsOutline />
            </button>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <Link href="/account-settings">Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
//<MdLightMode />
export default Header;
