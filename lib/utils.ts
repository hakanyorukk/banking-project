import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCumulativeTotal(accounts: Account[]): number {
  return accounts.reduce((total, account) => {
    return total + account.balance;
  }, 0);
}

export function getCumulativeMonthly(transaction: Transactions[]): number {
  return transaction.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
}

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  return format(date, "EEEE, MMM d, HH:mm ");
  //EEE=> day of the week
  //mmm=> month name
  //d => day
  //h:mm a am/pm format
}

const monthMap: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

function getMonthNumber(monthName: string): number {
  return monthMap[monthName];
}

export function sortMonthNames(monthNames: string[]): string[] {
  return monthNames.sort((a, b) => getMonthNumber(a) - getMonthNumber(b));
}

export function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  return date.toLocaleString("en-US", options);
}

export function calculateMonthlyTotals(transactions: Transactions[]): number[] {
  const monthlyTotals: { [month: string]: number } = {};

  transactions.forEach((transaction) => {
    const monthName = getMonthName(transaction.created_at);

    if (monthlyTotals[monthName]) {
      monthlyTotals[monthName] += transaction.amount;
    } else {
      monthlyTotals[monthName] = transaction.amount;
    }
  });
  return Object.keys(monthlyTotals)
    .sort((a, b) => getMonthNumber(b) - getMonthNumber(a))
    .map((month) => monthlyTotals[month]);

  // Return only the total amounts
  //return Object.values(monthlyTotals);
}

export const PAGE_SIZE = 12;

const today = new Date();
export const thirtyDaysAgo = new Date(
  today.setDate(today.getDate() - 30)
).toISOString();

export const SignupFormSchema = (type: string) =>
  z.object({
    // sign up
    first_name: type === "sign-in" ? z.string().optional() : z.string().min(3),
    last_name: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),

    postal_code:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    date_of_birth:
      type === "sign-in" ? z.string().optional() : z.string().min(3),

    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

export const UpdateFormSchema = (type: string) =>
  z
    .object({
      email:
        type === "account" ? z.string().email().optional() : z.string().email(),
      first_name:
        type === "account" ? z.string().optional() : z.string().min(3),
      last_name: type === "account" ? z.string().optional() : z.string().min(3),
      address: type === "account" ? z.string().optional() : z.string().max(50),
      city: type === "account" ? z.string().optional() : z.string().max(50),
      postal_code:
        type === "account" ? z.string().optional() : z.string().min(3).max(6),
      date_of_birth:
        type === "account" ? z.string().optional() : z.string().min(3),
      phone:
        type === "account"
          ? z.string().optional()
          : z.string().regex(/^\+?[\d\s()-]+$/, "Invalid phone number format"),
      state: type === "account" ? z.string().optional() : z.string().min(3),
      password: type === "password" ? z.string().min(6) : z.string().optional(),
      passwordConfirm:
        type === "password" ? z.string().min(6) : z.string().optional(),
    })
    .refine(
      (data) => {
        if (type === "password") {
          return data.password === data.passwordConfirm;
        }
        return true;
      },
      {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
      }
    );
export const PasswordFormSchema = () =>
  z
    .object({
      password: z.string().min(6),
      passwordConfirm: z.string().min(6),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    });

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// export function countTransactionCategories(
//   transactions: Transactions[]
// ): CategoryCount[] {
//   const categoryCounts: { [category: string]: number } = {};
//   let totalCount = 0;

//   // Iterate over each transaction
//   transactions &&
//     transactions.forEach((transaction) => {
//       // Extract the category from the transaction
//       const category = transaction.category_name;

//       // If the category exists in the categoryCounts object, increment its count
//       if (categoryCounts.hasOwnProperty(category)) {
//         categoryCounts[category]++;
//       } else {
//         // Otherwise, initialize the count to 1
//         categoryCounts[category] = 1;
//       }

//       // Increment total count
//       totalCount++;
//     });

//   // Convert the categoryCounts object to an array of objects
//   const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
//     (category) => ({
//       name: category,
//       count: categoryCounts[category],
//       totalCount,
//     })
//   );

//   // Sort the aggregatedCategories array by count in descending order
//   aggregatedCategories.sort((a, b) => b.count - a.count);

//   return aggregatedCategories;
// }

// .object({
//   email: z.string().optional(),
//   first_name:
//     type === "account" ? z.string().optional() : z.string().min(3),
//   last_name: type === "account" ? z.string().optional() : z.string().min(3),
//   address: type === "account" ? z.string().optional() : z.string().max(50),
//   city: type === "account" ? z.string().optional() : z.string().max(50),

//   postal_code:
//     type === "account" ? z.string().optional() : z.string().min(3).max(6),
//   date_of_birth:
//     type === "account" ? z.string().optional() : z.string().min(3),

//   password: type === "password" ? z.string().min(6) : z.string().optional(),
//   passwordConfirm:
//     type === "password" ? z.string().min(6) : z.string().optional(),
// })
// .refine((data) => data.password === data.passwordConfirm, {
//   message: "Passwords don't match",
//   path: ["passwordConfirm"],
// });

//!password work user not
// export const UpdateFormSchema = (type: string) =>
//   z
//     .object({
//       email: type === "account" ? z.string().optional() : z.string().email(),
//       first_name:
//         type === "account" ? z.string().optional() : z.string().min(3),
//       last_name: type === "account" ? z.string().optional() : z.string().min(3),
//       address: type === "account" ? z.string().optional() : z.string().max(50),
//       city: type === "account" ? z.string().optional() : z.string().max(50),

//       postal_code:
//         type === "account" ? z.string().optional() : z.string().min(3).max(6),
//       date_of_birth:
//         type === "account" ? z.string().optional() : z.string().min(3),

//       password: z.string().min(6),
//       passwordConfirm: z.string().min(6),
//     })
//     .refine((data) => data.password === data.passwordConfirm, {
//       message: "Passwords don't match",
//       path: ["passwordConfirm"],
//     });
