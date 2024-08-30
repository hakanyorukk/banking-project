"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("date") ?? "all";

  function handleFilter(filter: string): void {
    const params = new URLSearchParams(searchParams);
    params.set("date", filter);
    params.set("page", "1".toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <Button
        handleFilter={handleFilter}
        filter="all"
        activeFilter={activeFilter}
      >
        All Dates
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="last30d"
        activeFilter={activeFilter}
      >
        Last 30d
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="last1w"
        activeFilter={activeFilter}
      >
        Last 1w
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="last1d"
        activeFilter={activeFilter}
      >
        Last 1d
      </Button>
    </div>
  );
};
type ButtonProps = {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
};
function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`hover:bg-cyan-500 px-5 py-2 font-medium rounded-[0.25rem] hover:text-slate-100 ${
        filter === activeFilter ? "bg-cyan-500 text-slate-100 " : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
