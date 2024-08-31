"use client";

import { useState } from "react";
import { Form } from "./ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateFormSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import { LuLoader2 } from "react-icons/lu";
import UpdateInput from "./UpdateInput";
import { updateUser } from "@/lib/user.actions";
import toast from "react-hot-toast";

const UpdateUserForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  const type = "account";
  const formSchema = UpdateFormSchema(type);

  //1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: user.email,
    //   phone: "",
    //   first_name: user?.user_metadata?.first_name,
    //   last_name: user.user_metadata?.last_name,
    //   address: user.user_metadata?.address,
    //   state: user.user_metadata?.state,
    //   postal_code: user.user_metadata?.postal_code,
    //   date_of_birth: user.user_metadata?.date_of_birth,
    //   city: user.user_metadata?.city,
    // },
    defaultValues: {
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      state: user.state,
      postal_code: user.postal_code,
      date_of_birth: user.date_of_birth,
      city: user.city,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await updateUser({
        user: {
          ...user,
          userId: user.userId,
          created_at: user.created_at,
          user_metadata: user.user_metadata,
          ...data,
        },
      });
      // await updateUser({
      //   user: data,
      // });

      // await updateUser({
      //   user: {
      //     ...user, // spread all user properties
      //     user_metadata: {
      //       ...user.user_metadata,
      //     },
      //   },
      // });
      toast.success("Profile successfully updated!");
      //console.log(data);
    } catch (error) {
      toast.error("Failed to update profile. PLease try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-b dark:border-slate-600 border-slate-200 w-full"
      >
        <UpdateInput
          control={form.control}
          name="email"
          label="Email address"
          placeholder="Enter your email"
          disabled={true}
        />
        <div className="flex gap-14">
          <UpdateInput
            control={form.control}
            name="first_name"
            label="First name"
            placeholder="Enter your first name"
          />
          <UpdateInput
            control={form.control}
            name="last_name"
            label="Last name"
            placeholder="Enter your last name"
          />
        </div>
        <UpdateInput
          control={form.control}
          name="date_of_birth"
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
        />

        <div className="flex gap-14">
          <UpdateInput
            control={form.control}
            name="state"
            label="State"
            placeholder="Enter the state name"
          />
          <UpdateInput
            control={form.control}
            name="postal_code"
            label="Postal Code"
            placeholder="Example: 11101"
          />
        </div>

        <UpdateInput
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
        />

        <div className="flex gap-14">
          <UpdateInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter your city"
          />
          <UpdateInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your specific address"
          />
        </div>

        <div className="flex gap-4 items-center justify-end my-3">
          <Button
            type="reset"
            className="text-lg rounded-[.25rem] mt-4 hover:border-2 focus:border-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="form-button hover:bg-cyan-500 text-slate-50"
          >
            {isLoading ? (
              <>
                <LuLoader2 size={20} className="animate-spin" /> &nbsp;
                Loading...
              </>
            ) : (
              "Update Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
