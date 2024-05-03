import ResizableLayout from "@/components/resizable-layout/resizable-layout";

import { apiPaths } from "@/lib/api/api-paths";
import { scFetcher } from "@/lib/sc-fetcher";

import { ApiResponseType, User } from "@/types";

export default async function Home() {
  // Fetch the users from the server
  const response = await scFetcher(apiPaths.getUsers(), "GET");

  // Get the response data
  const apiData = (await response.json()) as ApiResponseType;

  // Initialize the users array
  let users: User[];

  // Check if the api call was successful and if the data contains the users array
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
