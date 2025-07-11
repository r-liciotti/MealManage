import { useEffect, useState } from "react";
import type { IIngrediente } from "../../interfaces/ICard";
import useStore from "../../store/useStore";
import getNutritionInfo from "../../api/apiNinjaCalories";
import { useQuery } from "@tanstack/react-query";

interface Props {
  item: IIngrediente;
  index: number;
}

function IngredientCardDialog({ item, index }: Props) {
  const updateCardIngredient = useStore((state) => state.updateCardIngredient);

  const ings = useStore.getState().cardSelected?.ingredienti[index];

  const { data, refetch, isFetching, isError } = useQuery<IIngrediente | null>({
    queryKey: ["fetchIngredients", ings?.name, ings?.peso],
    queryFn: () =>
      ings?.name && ings.peso
        ? getNutritionInfo(ings.name, ings.peso.toString())
        : Promise.resolve(null),
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  // ✅ Aggiorna lo store solo quando arrivano i nuovi dati
  useEffect(() => {
    if (data && !isFetching) {
      updateCardIngredient(index, {
        ...item,
        calorie: data.calorie,
        proteine: data.proteine,
      });
    }
  }, [data, isFetching]);

  const handleChange = (key: keyof IIngrediente, value: string | number) => {
    if (value === "") return;
    updateCardIngredient(index, { ...item, [key]: value });
  };

  const handleFetch = () => {
    if (ings?.name && ings.peso) {
      refetch();
    }
  };

  return (
    <div className="flex grow items-center gap-2">
      <div className="text-md grid w-full grid-cols-6 items-center font-bold">
        <div className="bg-neutral-content col-span-5 grid grid-cols-5 rounded-md p-2">
          <div className="col-span-2 flex">
            <input
              className="input"
              type="text"
              value={item.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="pl-2">
            <input
              type="text"
              className="input p-1 text-right"
              value={item.peso}
              onChange={(e) => handleChange("peso", +e.target.value)}
            />
          </div>
          <div className="self-center text-right">
            {isFetching ? (
              <span className="icon-[line-md--loading-twotone-loop] size-5" />
            ) : (
              item.calorie
            )}
          </div>
          <div className="self-center text-right">
            {isFetching ? (
              <span className="icon-[line-md--loading-twotone-loop] size-5" />
            ) : (
              item.proteine
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="tooltip">
            <button
              className="tooltip-toggle btn btn-text btn-md btn-circle"
              aria-label="Update Button"
              onClick={handleFetch}
              disabled={isFetching}
            >
              <span className="icon-[line-md--confirm] size-6"></span>
            </button>
            <span className="tooltip-content" role="tooltip">
              <span className="tooltip-body">
                {isFetching ? "Caricamento..." : "Aggiorna"}
              </span>
            </span>
          </div>
          <div className="tooltip">
            <button
              className="tooltip-toggle btn btn-text btn-md btn-circle"
              aria-label="Remove Button"
            >
              <span className="icon-[mingcute--wastebasket-line] size-7"></span>
            </button>
            <span className="tooltip-content" role="tooltip">
              <span className="tooltip-body">Rimuovi</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientCardDialog;
