"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useModalStore } from "@/providers/modal-store-provider";
import { useApiCountStore } from "@/providers/api-count-store-provider";
import { updateUser } from "@/lib/api/update-user";
import { nameFormatter } from "@/lib/formatters";
import revalidator from "@/actions/revalidator";
import { clientPaths } from "@/lib/client-paths";

import { ModalType } from "@/stores/modal-store";
import {
  EditUserFormSchema,
  EditUserFormValues,
} from "@/zod-schemas/edit-user-form-schema";

export default function EditUserModal() {
  // Get the router object
  const router = useRouter();

  // Get the modal store values
  const { isOpen, onClose, type, data } = useModalStore((store) => store);
  // Get the user data from the modal store
  const user = data?.user;

  // Get the increment function from the api count store
  const increment = useApiCountStore((store) => store.increment);

  // Create a form using react-hook-form
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Set the user name in the form
  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
    }
  }, [user]);

  // Check if the form is submitting
  const isLoading = form.formState.isSubmitting;

  // Function to close the modal
  const handleClose = () => {
    form.reset();
    onClose();
  };

  // Function to submit the form
  const onSubmit = async (data: EditUserFormValues) => {
    // Check if the user is present
    if (!user) {
      toast.error("User not found");
      return;
    }

    // call the edit user request
    const apiResponse = await updateUser({
      id: user._id,
      name: data.name,
    });

    // check if the api call was successful
    if (!apiResponse.success) {
      toast.error(apiResponse.message);
      return;
    }

    // show a success message
    toast.success(apiResponse.message);

    // close the modal
    handleClose();

    // increment the api count
    increment();

    // revalidate the data
    await revalidator([clientPaths.home()]);

    // revalidate the data
    return router.refresh();
  };

  return (
    <Dialog
      open={type === ModalType.editUser && isOpen && !!user}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        value={nameFormatter(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" disabled={isLoading}>
              Save User
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
