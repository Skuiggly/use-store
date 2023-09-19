import { useEffect, useState } from "react";

export function useNumberStore(key: string = "favorites"): {
  numberStore: number[];
  addToStore: (value: number) => void;
  removeFromStore: (value: number) => void;
  clearStore: () => void;
} {
  const [numberStore, setNumberStore] = useState<number[]>(() => {
    // Initialize list from local storage or []
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  });

  // Whenever list changes, update local storage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(numberStore));
    } catch (error) {
      console.error(error);
    }
  }, [numberStore, key]);

  function addToStore(value: number) {
    if (!numberStore.includes(value)) {
      setNumberStore([...numberStore, value]);
      console.log("NumberStore: added " + value);
    } else {
      // Disallow duplicates
      console.log("NumberStore: value already exists");
    }
  }
  function removeFromStore(value: number) {
    if (numberStore.includes(value)) {
      setNumberStore(numberStore.filter((item) => item !== value));
    } else {
      console.log("NumberStore: nothing to remove");
    }
  }
  function clearStore() {
    setNumberStore([]);
  }

  return { numberStore, addToStore, removeFromStore, clearStore };
}
