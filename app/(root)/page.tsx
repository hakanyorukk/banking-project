import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import TotalBalnceBox from "@/components/TotalBalanceBox";
import ExpensesMonth from "@/components/ExpensesMonth";
import MoneyAnalytics from "@/components/MoneyAnalytics";
import RecentTransactionBox from "@/components/RecentTransactionBox";
import {
  getAccountsInfo,
  getTransactionsAll,
  getTransactionsAllExpenses,
  getTransactionsAllIncomes,
  getTransactionsExpense,
  getTransactionsIncomes,
  getTransactionsRecent,
} from "@/lib/bank.actions";
import { getCumulativeMonthly, getCumulativeTotal } from "@/lib/utils";
import RightSideBar from "@/components/RightSideBar";
import IncomesMonth from "@/components/IncomesMonth";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const userID = data.user.id;
  // console.log(data.user.user_metadata);

  const expensesLast30 = await getTransactionsExpense({ userId: userID });
  const incomesLast30 = await getTransactionsIncomes({ userId: userID });
  const totalExpenseMonth = await getCumulativeMonthly(expensesLast30 || []);
  const totatlIncomesMonth = await getCumulativeMonthly(incomesLast30 || []);
  const accountData = await getAccountsInfo({ userId: userID });
  const transactionsHistoryAll = await getTransactionsAll({
    userId: userID,
  });

  const transactionsHistoryAllExpenses = await getTransactionsAllExpenses({
    userId: userID,
  });
  const transactionsHistoryAllIncomes = await getTransactionsAllIncomes({
    userId: userID,
  });

  const transactionsHistoryRecent = await getTransactionsRecent({
    userId: userID,
  });

  const totalCurrentBalance = getCumulativeTotal(accountData || []);

  return (
    <section className="flex">
      <div className="w-full h-full">
        <div className="flex flex-col gap-6 p-4">
          <div className="p-4 mx-4 mt-6">
            <h1 className="text-5xl font-bold">
              Welcome,{" "}
              <span className="bg-gradient-to-l  from-teal-400 to-sky-600 text-transparent bg-clip-text">
                {data.user.user_metadata?.first_name || ""}
              </span>
            </h1>
            <p className="text-lg">
              Access & manage your account and transactions efficiently.
            </p>
          </div>
          <div className="flex">
            <TotalBalnceBox
              totalCurrentBalance={totalCurrentBalance}
              accounts={accountData as Account[]}
            />
            <IncomesMonth totatlIncomesMonth={totatlIncomesMonth} />
            <ExpensesMonth totalExpenseMonth={totalExpenseMonth} />
          </div>
          <MoneyAnalytics
            transactions={transactionsHistoryAll as Transactions[]}
            transactionsExpenses={
              transactionsHistoryAllExpenses as Transactions[]
            }
            transactionsIncomes={
              transactionsHistoryAllIncomes as Transactions[]
            }
          />
          <RecentTransactionBox
            transactions={transactionsHistoryRecent as Transactions[]}
            transactionsExpenses={
              transactionsHistoryAllExpenses as Transactions[]
            }
            transactionsIncomes={
              transactionsHistoryAllIncomes as Transactions[]
            }
          />
        </div>
      </div>
      <div className="basis-96 border-l-2 border-color bg-slate-50 dark:bg-slate-800 relative">
        <RightSideBar
          user={data.user.user_metadata as User}
          transactions={transactionsHistoryAll as Transactions[]}
          accounts={accountData as Account[]}
        />
      </div>
    </section>
  );
}
