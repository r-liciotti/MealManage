import { useRef } from "react";
import IngredientForm, { type IngredientFormHandle } from "./IngredientForm";
import { generateId } from "../../helper/helper";

export type IngredientFormEntry = {
  id: string;
  ref: React.RefObject<IngredientFormHandle | null>;
};
interface Props {
  formRefs: IngredientFormEntry[];
  setFormRefs: React.Dispatch<React.SetStateAction<IngredientFormEntry[]>>;
}

function IngredientInDialog({ formRefs, setFormRefs }: Props) {
  const newRef = useRef<IngredientFormHandle | null>(null);
  const handleAddIngredientForm = () => {
    const newEntry: IngredientFormEntry = {
      id: generateId(),
      ref: newRef,
    };
    setFormRefs((prev) => [...prev, newEntry]);
  };

  const handleDeleteIngredientForm = (idToDelete: string) => {
    setFormRefs((prev) => prev.filter((entry) => entry.id !== idToDelete));
  };

  return (
    <div className="flex flex-col gap-4">
      {formRefs.map(({ id, ref }) => (
        <IngredientForm
          key={id}
          ref={ref}
          onDelete={() => handleDeleteIngredientForm(id)}
        />
      ))}

      <div className="flex gap-2">
        <button
          className="btn btn-outline btn-primary grow"
          onClick={handleAddIngredientForm}
        >
          Aggiungi Ingrediente
        </button>
      </div>
    </div>
  );
}

export default IngredientInDialog;
