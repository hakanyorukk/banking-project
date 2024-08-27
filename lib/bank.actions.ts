"use server";

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
    return data;
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

export const getTransactionsSelected = async ({
  userId,
  filter,
  page,
}: getTransactionsAllProps) => {
  try {
    const supabase = createClient();
    let query = supabase.from("transactions").select("*").eq("user_id", userId);

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
      .range(0, 8);
    //await new Promise((res) => setTimeout(res, 10000));

    if (error) throw error;
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};
