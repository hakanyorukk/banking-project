import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex items-center py-8 cursor-pointer  gap-2 justify-center "
      >
        <Image src="/bank.png" width={40} height={40} alt="logo" />
        <h1 className="logo-text">Truvia Bank</h1>
      </Link>
    </div>
  );
};

export default Logo;
