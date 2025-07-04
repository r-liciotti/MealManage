import { forwardRef, useImperativeHandle, useState } from "react";
import type { IIngrediente } from "../../interfaces/ICard";

export interface IngredientFormHandle {
  getValues: () => IIngrediente;
}

interface IngredientFormProps {
  onDelete: () => void;
}

const IngredientForm = forwardRef<IngredientFormHandle, IngredientFormProps>(
  ({ onDelete }, ref) => {
    const [name, setName] = useState("");
    const [peso, setPeso] = useState<number>(100);

    useImperativeHandle(ref, () => ({
      getValues: () => ({
        name,
        peso,
        calorie: 0,
        proteine: 0,
      }),
    }));

    return (
      <div className="flex items-center gap-2">
        <div className="input w-full">
          <label className="label-text my-auto me-3 p-0">Ingrediente</label>
          <input
            type="text"
            placeholder="Ingrediente"
            className="grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input w-fit">
          <label className="label-text my-auto me-3 p-0">Peso</label>
          <input
            type="number"
            placeholder="Peso"
            className="grow"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
          />
        </div>
        <button
          onClick={onDelete}
          className="tooltip-toggle btn btn-text btn-md btn-circle"
          aria-label="Delete Button"
        >
          <span className="icon-[hugeicons--delete-02] size-6"></span>
        </button>
      </div>
    );
  },
);

export default IngredientForm;
