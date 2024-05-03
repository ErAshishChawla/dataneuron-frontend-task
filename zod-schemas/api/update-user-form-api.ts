import { z } from "zod";

// Matches the following conditions:
// Starts with alphabets.
// Contains only alphabets.
// Has only one space (if present).
// Ends with alphabets.

const fullNameRegex = new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)?$");

// Zod Schema for update user api call
export const UpdateUserApiSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .regex(fullNameRegex, "Invalid name format"),
});

// Type for update user api call
export type UpdateUserFormValues = z.infer<typeof UpdateUserApiSchema>;
