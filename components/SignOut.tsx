"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { GoSignOut } from "react-icons/go";
import { signout } from "@/lib/user.actions";
import { LuLoader2 } from "react-icons/lu";
import { redirect } from "next/navigation";

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await signout();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //<span className="z-10 capitalize text-xl">Sign out</span>
  //{isLoading ? (): ("Sign out")}
  return (
    <Button className="signout justify-start" onClick={() => handleSignout()}>
      <div className="flex gap-1 items-center text-xl font-medium z-10">
        {isLoading ? (
          <>
            <LuLoader2 size={15} className="animate-spin" /> &nbsp;
            <span className="z-10 capitalize text-lg">Sign out...</span>
          </>
        ) : (
          <>
            <GoSignOut className="mr-1" size={20} />
            <span className="z-10 capitalize text-lg">Sign out</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default SignOut;
