"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BankDropdown from "./BankDropdown";
import { Textarea } from "./ui/textarea";
import { LuLoader2 } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import { createTransaction } from "@/lib/bank.actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  note: z.string().optional(),
  amount: z.string(),
  senderBank: z.string(),
  accountId: z.string().min(8, "Please select a valid account id"),
});

const PaymentTransferForm = ({
  accounts,
  userId,
}: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@test.com",
      note: "",
      amount: "10",
      senderBank: "1",
      accountId: "01010101",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      //console.log(data);
      const transaction = {
        reciverEmail: data.email,
        amount: data.amount,
        senderBank: data.senderBank,
        userId: userId,
      };

      const newTransaction = await createTransaction(transaction);

      toast.success("Funds have been successfully transferred!");

      if (newTransaction) {
        form.reset();
        router.push("/");
      }
    } catch (error) {
      toast.error("This didn't work.");
      console.error("Submitting create transfer request failed: ", error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="flex md:flex-row flex-col border-b dark:border-slate-600 border-slate-200 py-4">
              <div className=" basis-2/5 mr-8">
                <FormLabel className="text-lg font-medium">
                  Select Source Bank
                </FormLabel>
                <FormDescription className="sm:text-base text-sm">
                  Select the bank account you want to transfer funds from
                </FormDescription>
              </div>

              <FormControl>
                <BankDropdown
                  accounts={accounts || []}
                  setValue={form.setValue}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="flex md:flex-row flex-col border-b dark:border-slate-600 border-slate-200 py-4">
              <div className="basis-2/5 mr-8">
                <FormLabel className="text-lg">
                  Transfer Note (Optional)
                </FormLabel>
                <FormDescription className="sm:text-base text-sm">
                  Please provide any additional information or instructions
                  related to the transfer
                </FormDescription>
              </div>

              <FormControl>
                <Textarea
                  placeholder="Write a short note here"
                  className="form-input sm:text-base text-xs"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4 border-b dark:border-slate-600 border-slate-200 ">
          <h2 className="sm:text-3xl text-xl font-bold py-2">
            Bank account details
          </h2>
          <p className="md:text-lg text-sm">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex border-b dark:border-slate-600 border-slate-200 py-4">
              <div className="basis-2/5 mr-8 flex items-center ">
                <FormLabel className="md:text-lg text-xs ">
                  Recipient&apos;s Email Address
                </FormLabel>
              </div>

              <FormControl>
                <Input
                  placeholder="ex: test@test.com"
                  className="form-input  sm:text-base text-xs"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem className="flex border-b dark:border-slate-600 border-slate-200 py-4">
              <div className="basis-2/5 mr-8 flex items-center ">
                <FormLabel className="md:text-lg text-xs">
                  Recipient&apos;s Bank Account Number
                </FormLabel>
              </div>

              <FormControl>
                <Input
                  placeholder="Enter the account number"
                  className="form-input  sm:text-base text-xs"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex border-b dark:border-slate-600 border-slate-200 py-4">
              <div className="basis-2/5 mr-8 flex items-center ">
                <FormLabel className="md:text-lg text-xs">Amount</FormLabel>
              </div>

              <FormControl>
                <Input
                  type="number"
                  placeholder="ex: 15.00"
                  className="form-input sm:text-base text-xs"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mt-2 justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="form-button hover:bg-cyan-500 text-slate-50 place-items-end p-6"
          >
            {isLoading ? (
              <>
                <LuLoader2 size={20} className="animate-spin" /> &nbsp;
                Loading...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
