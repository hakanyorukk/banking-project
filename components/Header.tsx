import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";
import ProfileAvatar from "./ProfileAvatar";

import MobileNav from "./MobileNav";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }
  return (
    <div className="flex h-fit w-full border-b border-color bg-slate-50 dark:bg-slate-800 dark:text-slate-200 sticky top-0 z-50 justify-between py-3 ">
      <div className="justify-start place-items-center flex xl:hidden px-8 ">
        <MobileNav />
      </div>
      <nav className="flex w-full justify-end">
        <ul className="flex sm:gap-8 gap-3.5 sm:mr-10 mr-4 items-center font-light ">
          <li className="p-1 sm:text-2xl text-[1.35rem]">
            <DarkModeToggle />
          </li>
          <li>
            <Link
              className="sm:text-2xl text-xl flex items-center"
              href="https://github.com/hakanyorukk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
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
