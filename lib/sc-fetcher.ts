// Purpose: Fetcher for server-client communication.

// Fetcher for server-client communication. Axios cant be used in server components without adapter, but fetch can be used in both client and server.
export async function scFetcher(url: string, method?: string, body?: any) {
  const serverURL =
    process.env.SERVER_URL ||
    "https://dataneuron-backend-task.onrender.com/api";
  const requestURL = `${serverURL}${url}`;

  const response = await fetch(requestURL, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    credentials: "include",
  });

  return response;
}
