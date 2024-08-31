"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import SideNavigation from "./SideNavigation";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { TbTransactionEuro } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";

import { usePathname } from "next/navigation";
import SignOut from "./SignOut";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: <IoHomeOutline />,
  },
  {
    label: "My Banks",
    route: "/my-banks",
    icon: <IoWalletOutline />,
  },
  {
    label: "Transaction History",
    route: "/transaction-history",
    icon: <TbTransactionEuro />,
  },
  {
    label: "Transfer Funds",
    route: "/payment-transfer",
    icon: <CiCreditCard1 />,
  },
  {
    label: "Settings",
    route: "/account-settings",
    icon: <IoSettingsOutline />,
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu className="text-xl flex justify-center place-items-center my-3" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-slate-100 dark:bg-slate-800 w-[60%]"
        >
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>

            <SheetClose asChild>
              <nav className="p-4 text-xs md:text-base 2xl:text-xl ">
                <ul className="flex flex-col sm:gap-4 gap-2">
                  {navLinks.map((item) => {
                    const isActive =
                      pathname === item.route ||
                      pathname.startsWith(`${item.route}/`);
                    return (
                      <SheetClose asChild key={item.route}>
                        <Link
                          href={item.route}
                          key={item.label}
                          className={cn("sidebar-link", {
                            "sidebar-link_active": isActive,
                          })}
                        >
                          <div
                            className={cn(
                              "mg:text-2xl text-base font-bold z-10"
                            )}
                          >
                            {item.icon}
                          </div>
                          <span className={cn("z-10")}>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <li className="absolute bottom-10 w-full px-8 left-0 right-0 mx-auto ">
                    <SignOut />
                  </li>
                </ul>
              </nav>
            </SheetClose>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
