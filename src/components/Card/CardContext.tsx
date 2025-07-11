import { createContext, useContext } from "react";
import type { ICard, IIngrediente } from "../../interfaces/ICard";

interface CardContextType {
  card: ICard;
  setCard?: (card: ICard) => void;
  setTitle?: (title: string) => void;
  setIngredienti?: (ingredienti: IIngrediente[]) => void;
  updateIngrediente?: (index: number, updated: IIngrediente) => void;
  removeIngrediente?: (index: number) => void;
  addIngrediente?: (ingrediente: IIngrediente) => void;
}

export const CardContext = createContext<CardContextType | undefined>(
  undefined,
);

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};
