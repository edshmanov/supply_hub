import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface TruckListContextType {
  trucks: string[];
  addTruck: (truck: string) => void;
  removeTruck: (index: number) => void;
  clearTrucks: () => void;
  truckCount: number;
}

const TruckListContext = createContext<TruckListContextType | undefined>(undefined);

const STORAGE_KEY = "supply-hub-trucks";

export function TruckListProvider({ children }: { children: ReactNode }) {
  const [trucks, setTrucks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trucks));
  }, [trucks]);

  const addTruck = useCallback((truck: string) => {
    setTrucks((prev) => [...prev, truck]);
  }, []);

  const removeTruck = useCallback((index: number) => {
    setTrucks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearTrucks = useCallback(() => {
    setTrucks([]);
  }, []);

  return (
    <TruckListContext.Provider
      value={{
        trucks,
        addTruck,
        removeTruck,
        clearTrucks,
        truckCount: trucks.length,
      }}
    >
      {children}
    </TruckListContext.Provider>
  );
}

export function useTruckList() {
  const context = useContext(TruckListContext);
  if (!context) {
    throw new Error("useTruckList must be used within a TruckListProvider");
  }
  return context;
}
