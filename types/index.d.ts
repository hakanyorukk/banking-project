declare type getUserInfoProps = {
  userId: string;
};

declare type getTransactionsAllProps = {
  userId: string;
  page?: number;
  filter?: string;
};

declare type User = {
  userId: string;
  created_at: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  date_of_birth: string;
  postal_code: string;
  email: string;
  password: string;
  user_metadata: UserMetada;
};

declare type UserMetada = {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  date_of_birth: string;
  postal_code: string;
  email: string;
};

declare type Account = {
  id: number;
  created_at: string;
  bank_name: string;
  balance: number;
  number: number;
  user_id: string;
};

declare type Transactions = {
  id: number;
  created_at: string;
  amount: number;
  channel: string;
  transaction_name: string;
  status: string;
  user_id: string;
  category_name: string;
};

declare interface TransactionsBoxProps {
  transactions: Transactions[];
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalCurrentBalance: number;
}

declare interface MonthlyAnalysisBoxProps {
  month_name: string;
  totalAmount: number;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface LineChartProps {
  transactions: Transactions[];
}

declare interface RightSideBarProps {
  user: User;
  accounts: Account[];
  transactions: Transactions[];
}

declare interface CardProps {
  account: Account;
  user: User;
  index: number;
}

declare type categoryBackgroundColors = {
  "Health & Wellness": string;
  Education: string;
  Shopping: string;
  Entertainment: string;
  "Utilities & Bills": string;
  Travel: string;
  "Food and Drink": string;
};

declare type signInProps = { email: string; password: string };

declare type signUpProps = { email: string; password: string; userData: User };

// declare type CategoryCount = {
//   name: string;
//   count: number;
//   totalCount: number;
// };
