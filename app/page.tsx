import ResizableLayout from "@/components/resizable-layout/resizable-layout";

import { apiPaths } from "@/lib/api/api-paths";
import { scFetcher } from "@/lib/sc-fetcher";

import { ApiResponseType, User } from "@/types";

export default async function Home() {
  const response = await scFetcher(apiPaths.getUsers(), "GET");

  const apiData = (await response.json()) as ApiResponseType;

  let users: User[];

  if (!apiData.success) {
    users = [];
  } else if (apiData.data?.users) {
    users = apiData.data.users;
  } else {
    users = [];
  }

  return (
    <div className="flex-1 flex flex-col">
      <ResizableLayout users={users} />
    </div>
  );
}
