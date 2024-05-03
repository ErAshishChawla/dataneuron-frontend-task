export async function scFetcher(url: string, method?: string, body?: any) {
  const serverURL = process.env.SERVER_URL || "http://localhost:8000/api";
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
