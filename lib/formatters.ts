// Purpose: Contains all the formatters used in the application.

// Formats the name to have the first letter of each word capitalized.
export const nameFormatter = (name: string) => {
  if (!name) return "";

  const splittedNames = name.split(" ");

  const formattedNames = splittedNames.map((name) => {
    const lowercasedName = name.toLowerCase();

    return lowercasedName.charAt(0).toUpperCase() + lowercasedName.slice(1);
  });

  return formattedNames.join(" ");
};
