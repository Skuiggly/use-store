import { useEffect, useState } from "react";

export function useText(
  key: string,
  defaultValue = "",
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [text, setText] = useState<string>(() => {
    // Initialize from local storage or default to empty string
    const data = localStorage.getItem(key);
    return data ? data : defaultValue;
  });

  // Whenever bool changes, update local storage
  useEffect(() => {
    try {
      localStorage.setItem(key, text);
    } catch (error) {
      console.error(error);
    }
  }, [text, key]);
  return [text, setText];
}
