import { z } from "zod";

// Matches the following conditions:
// Starts with alphabets.
// Contains only alphabets.
// Has only one space (if present).
// Ends with alphabets.

const fullNameRegex = new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)?$");

// Zod Schema for add user form
export const AddUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .regex(fullNameRegex, "Invalid name format"),
});

// Type for add user form values
export type AddUserFormValues = z.infer<typeof AddUserFormSchema>;
