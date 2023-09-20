import { useCallback, useEffect, useState } from "react";

export function useBoolean(
  key: string,
  defaultValue = false,
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] {
  const [bool, setBool] = useState<boolean>(() => {
    // Initialize from local storage or default to false
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  });

  // Whenever bool changes, update local storage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(bool));
    } catch (error) {
      console.error(error);
    }
  }, [bool, key]);

  const toggleBoolean = useCallback(() => {
    setBool(!bool);
  }, [bool]);
  return [bool, toggleBoolean, setBool];
}
