import { useState, type ReactNode } from "react";
import { CardContext } from "./CardContext";
import type { ICard, IIngrediente } from "../../interfaces/ICard";

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [card, setCard] = useState<ICard>({
    id: undefined,
    title: "",
    meal: "Colazione",
    giorno: "Lunedi",
    ingredienti: [],
    tot_peso: 0,
    tot_calorie: 0,
    tot_proteine: 0,
  });

  const setTitle = (title: string) => {
    setCard((prev) => ({ ...prev, title }));
  };

  const setIngredienti = (ingredienti: IIngrediente[]) => {
    setCard((prev) => ({ ...prev, ingredienti }));
  };

  const updateIngrediente = (index: number, updated: IIngrediente) => {
    const newList = [...card.ingredienti];
    newList[index] = updated;
    setIngredienti(newList);
  };

  const removeIngrediente = (index: number) => {
    const newList = [...card.ingredienti];
    newList.splice(index, 1);
    setIngredienti(newList);
  };

  const addIngrediente = (ingrediente: IIngrediente) => {
    setIngredienti([...card.ingredienti, ingrediente]);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        setTitle,
        setIngredienti,
        updateIngrediente,
        removeIngrediente,
        addIngrediente,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
