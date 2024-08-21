"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { HiRefresh } from "react-icons/hi";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { TbTransactionEuro } from "react-icons/tb";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: <IoHomeOutline />,
  },
  {
    name: "My Banks",
    href: "/my-banks",
    icon: <IoWalletOutline />,
  },
  {
    name: "Transaction History",
    href: "/transaction-history",
    icon: <TbTransactionEuro />,
  },
  {
    name: "Transfer Funds",
    href: "/payment-transfer",
    icon: <CiCreditCard1 />,
  },
  {
    name: "Settings",
    href: "/account-settings",
    icon: <IoSettingsOutline />,
  },
];

const SideNavigation = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="p-4 text-xl">
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`sidebar-link ${
                pathname === link.href ? "sidebar-link_active" : ""
              }`}
            >
              <div className="text-2xl font-bold z-10">{link.icon}</div>
              <span className="z-10">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
