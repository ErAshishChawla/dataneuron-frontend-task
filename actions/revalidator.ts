"use server";

import { revalidatePath } from "next/cache";

// Revalidate the paths
export default async function revalidator(paths: string[]) {
  paths.forEach((path) => {
    revalidatePath(path);
  });
}
