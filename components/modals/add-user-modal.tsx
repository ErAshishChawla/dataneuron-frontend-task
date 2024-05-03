"use client";

import React from "react";
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
import { addUser } from "@/lib/api/add-user";
import revalidator from "@/actions/revalidator";
import { clientPaths } from "@/lib/client-paths";
import { nameFormatter } from "@/lib/formatters";

import { ModalType } from "@/stores/modal-store";
import {
  AddUserFormSchema,
  AddUserFormValues,
} from "@/zod-schemas/add-user-form-schema";

export default function AddUserModal() {
  // Get the router object
  const router = useRouter();

  // Get the modal store values
  const { isOpen, onClose, type } = useModalStore((store) => store);
  // Get the increment function from the api count store
  const increment = useApiCountStore((store) => store.increment);

  // Create a form using react-hook-form
  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Check if the form is submitting
  const isLoading = form.formState.isSubmitting;

  // Function to close the modal
  const handleClose = () => {
    form.reset();
    onClose();
  };

  // Function to handle form submission
  const onSubmit = async (data: AddUserFormValues) => {
    // call the add user request
    const apiResponse = await addUser(data);

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

    // revalidate and refresh the page
    revalidator([clientPaths.home()]);

    return router.refresh();
  };

  return (
    <Dialog
      open={type === ModalType.addUser && isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
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
              Add User
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
