"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import { CiCreditCard1 } from "react-icons/ci";

const BankDropdown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSeclected] = useState(accounts[0] || []);
  const [activeCard, setActiveCard] = useState(0);

  function handleBankChange(id: string): void {
    const params = new URLSearchParams(searchParams);
    params.set("senderBank", id.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    //setActiveCard(id);
    setSeclected(accounts[Number(id) - 1]);

    if (setValue) {
      setValue("senderBank", selected.id.toString());
    }
  }

  return (
    <Select
      defaultValue={selected.bank_name}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger
        className={`flex max-w-[30rem] rounded-[.5rem] gap-2 bg-slate-100 dark:bg-slate-900 dark:border-slate-500 border-slate-200 ${otherStyles}`}
      >
        <CiCreditCard1 className="h-10 w-8" />

        <p className="line-clamp-1 text-left w-full">{selected.bank_name}</p>
        <p className="">{formatAmount(selected.balance)}</p>
      </SelectTrigger>
      <SelectContent
        className={`sm:w-[30rem] w-full rounded-[.5rem] bg-slate-100 dark:bg-slate-900 dark:border-slate-600 border-slate-200`}
        align="end"
      >
        {accounts ? (
          <SelectGroup>
            <SelectLabel className="py-2 font-normal">
              Select a bank to display
            </SelectLabel>
            {accounts.map((account: Account) => (
              <SelectItem
                key={account.id}
                value={account.id.toString()}
                className="cursor-pointer border-t  dark:border-slate-600 border-slate-200"
              >
                <div className="flex flex-col ">
                  <p className="text-16 font-medium">{account.bank_name}</p>
                  <p className="text-14 font-medium text-cyan-500">
                    {formatAmount(account.balance)}
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ) : (
          <p>No account</p>
        )}
      </SelectContent>
    </Select>
  );
};
export default BankDropdown;
