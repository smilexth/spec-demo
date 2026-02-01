// useLocalStorage hook for automatic state synchronization
import { useState, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, boolean] {
  // Initialize state from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Return wrapped version of useState that persists to localStorage
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error(`Failed to save to localStorage (key: ${key}):`, error);
      }
    },
    [key]
  );

  // Check if localStorage is available
  const isAvailable = typeof window !== 'undefined' && (() => {
    try {
      const test = '__localStorage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  })();

  return [storedValue, setValue, isAvailable];
}
