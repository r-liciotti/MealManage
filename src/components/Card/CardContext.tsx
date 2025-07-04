// context/CardContext.tsx
import { createContext, useContext } from "react";
import type { ICard } from "../../interfaces/ICard";

export const CardContext = createContext<ICard | undefined>(undefined);

export function useCard() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}
