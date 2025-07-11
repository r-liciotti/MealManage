import { createContext, useContext } from "react";
import type { ICard, IIngrediente } from "../interfaces/ICard";

// Tipo del context
interface CardContextType {
    card: ICard;
    setCard: (card: ICard) => void;
    setTitle: (title: string) => void;
    setIngredienti: (ingredienti: IIngrediente[]) => void;
    updateIngrediente: (index: number, updated: IIngrediente) => void;
    removeIngrediente: (index: number) => void;
    addIngrediente: (ingrediente: IIngrediente) => void;
}

// Create context
const CardContext = createContext<CardContextType | undefined>(undefined);

// Hook per accedere al context
export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useCard must be used within a CardProvider");
    }
    return context;
};