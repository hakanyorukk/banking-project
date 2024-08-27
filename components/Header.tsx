import Link from "next/link";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import DarkModeToggle from "./DarkModeToggle";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileAvatar from "./ProfileAvatar";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }
  return (
    <div className="flex h-fit w-full border-b border-color bg-slate-50 dark:bg-slate-800 dark:text-slate-200 sticky top-0 z-50">
      <nav className="flex w-full justify-end">
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
          <li className="px-2 relative after:absolute after:rounded-xl after:w-full after:content-['']  after:h-[.15rem] after:origin-[0%_100%] after:scale-x-0 after:scale-y-100 after:left-0 after:-bottom-1 after:bg-cyan-400 hover:after:scale-x-100 hover:after:scale-y-100 after:transform after:duration-300 after:delay-300 after:ease-in-out hover:delay-300 group">
            <Link href="/account-settings">
              <ProfileAvatar firstName={user?.user_metadata.first_name} />
              {/* {user?.user_metadata.first_name} */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
//<MdLightMode />
export default Header;
