import { z } from "zod";

// Matches the following conditions:
// Starts with alphabets.
// Contains only alphabets.
// Has only one space (if present).
// Ends with alphabets.

const fullNameRegex = new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)?$");

// Zod Schema for edit user form
export const EditUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .regex(fullNameRegex, "Invalid name format"),
});

// Type for edit user form values
export type EditUserFormValues = z.infer<typeof EditUserFormSchema>;
