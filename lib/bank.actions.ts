"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/client";
import { PAGE_SIZE } from "./utils";

export const getAccountsInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bankAccount")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    const sortedData = data.sort((a: { id: string }, b: { id: string }) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    return sortedData;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsAll = async ({
  userId,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);

    //await new Promise((res) => setTimeout(res, 10000));

    if (error) throw error;
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsAllExpenses = async ({
  userId,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("transaction_type", "Expense")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsAllIncomes = async ({
  userId,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("transaction_type", "Income")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsExpense = async ({
  userId,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    const currentDate = new Date();
    const last30Days = new Date(currentDate);
    last30Days.setDate(last30Days.getDate() - 30);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .gte("created_at", last30Days.toISOString())
      .eq("transaction_type", "Expense")
      .eq("user_id", userId);

    if (error) throw error;
    revalidatePath("/");
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsIncomes = async ({
  userId,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    const currentDate = new Date();
    const last30Days = new Date(currentDate);
    last30Days.setDate(last30Days.getDate() - 30);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .gte("created_at", last30Days.toISOString())
      .eq("transaction_type", "Income")
      .eq("user_id", userId);

    if (error) throw error;
    revalidatePath("/");
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsSelected = async ({
  userId,
  filter,
  page,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    let query = supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("user_id", userId);

    // Get current date
    const currentDate = new Date();

    // Apply filters based on filter parameter
    if (filter === "last30d") {
      const last30Days = new Date(currentDate);
      last30Days.setDate(last30Days.getDate() - 30);
      query = query.gte("created_at", last30Days.toISOString());
    } else if (filter === "last1w") {
      const last1Week = new Date(currentDate);
      last1Week.setDate(last1Week.getDate() - 7);
      query = query.gte("created_at", last1Week.toISOString());
    } else if (filter === "last1d") {
      const last1Day = new Date(currentDate);
      last1Day.setDate(last1Day.getDate() - 1);
      query = query.gte("created_at", last1Day.toISOString());
    }

    if (page) {
      const from = (page - 1) * (PAGE_SIZE - 1);
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const getTransactionsRecent = async ({ userId }: getUserInfoProps) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(0, 8);
    //await new Promise((res) => setTimeout(res, 10000));

    if (error) throw error;
    revalidatePath("/");
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const createTransaction = async ({
  userId,
  amount,
  senderBank,
  reciverEmail,
}: CreateTransactionProps) => {
  try {
    const supabase = createClient();

    //Create new Transactions
    const { data, error: TransactionsError } = await supabase
      .from("transactions")
      .insert([
        {
          amount: amount,
          transaction_name: `Transfer (${reciverEmail})`,
          category_name: "Transaction",
          user_id: userId,
        },
      ])
      .eq("user_id", userId)
      .select();

    if (TransactionsError) throw TransactionsError;

    //Get bank account balance
    const { data: balanceData, error: BalanceError } = await supabase
      .from("bankAccount")
      .select("balance")
      .eq("id", senderBank)
      .eq("user_id", userId);

    if (BalanceError) throw BalanceError;
    console.log(balanceData[0]);

    //Update bank account balance
    const newBalance = Number(balanceData[0].balance) - Number(amount);
    console.log(newBalance);

    const { error } = await supabase
      .from("bankAccount")
      .update({ balance: newBalance })
      .eq("id", senderBank)
      .eq("user_id", userId)
      .select();

    if (error) throw error;
    revalidatePath("/");
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};
