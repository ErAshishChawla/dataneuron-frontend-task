"use server";

import { revalidatePath } from "next/cache";

export default async function revalidator(paths: string[]) {
  paths.forEach((path) => {
    revalidatePath(path);
  });
}
