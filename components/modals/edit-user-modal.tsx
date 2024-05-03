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
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModalStore((store) => store);
  const user = data?.user;

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
    }
  }, [user]);

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: EditUserFormValues) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    // call the add user request
    const apiResponse = await updateUser({
      id: user._id,
      name: data.name,
    });

    if (!apiResponse.success) {
      toast.error(apiResponse.message);
      return;
    }

    toast.success(apiResponse.message);

    await revalidator([clientPaths.home()]);

    // revalidate the data
    router.refresh();
    return handleClose();
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
