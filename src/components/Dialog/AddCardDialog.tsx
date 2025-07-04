import { useEffect, useRef, useState } from "react";
import type { ICard, IIngrediente } from "../../interfaces/ICard";
import useStore from "../../store/useStore";
import IngredientInDialog, {
  type IngredientFormEntry,
} from "./IngredientInDialog";
import type { IngredientFormHandle } from "./IngredientForm";
import { generateId } from "../../helper/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertPasto } from "../../api/apiSupabase";
import { useAuth } from "../../auth/AuthProvider";
import type { User } from "@supabase/supabase-js";

function AddCardDialog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const meal = useStore((state) => state.mealSelected);
  const giornoActive = useStore((state) => state.giornoActive.giorno);
  const cardSelected = useState(useStore((state) => state.cardSelected));

  const [card, setCard] = useState<ICard>({
    title: "",
    meal: meal,
    giorno: giornoActive,
    ingredienti: [],
    tot_peso: 0,
    tot_calorie: 0,
    tot_proteine: 0,
  });

  const [formRefs, setFormRefs] = useState<IngredientFormEntry[]>([
    {
      id: generateId(),
      ref: useRef<IngredientFormHandle | null>(null),
    },
  ]);
  const showAddPastoDialog = useStore((state) => state.showAddPastoDialog);
  const toggleAddPastoDialog = useStore((state) => state.toggleAddPastoDialog);

  const mutation = useMutation({
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Inserisce il nuovo pasto nel db.
     * @param {Object} args - oggetto con propriet 

/*******  7274a88d-d8ed-4a37-83d4-7a9518a7dc9d  *******/
    mutationFn: ({ card, user }: { card: ICard; user: User }) => {
      return insertPasto(card, user);
    },
    onSuccess: (data) => {
      console.log("Nuovo pasto creato:", data);
      queryClient.invalidateQueries({
        queryKey: ["pasti", giornoActive, meal],
      });
      handleClose();
    },
    onError: (error) => {
      console.error("Errore Insert pasto:", error);
    },
  });

  const handleClose = () => toggleAddPastoDialog();
  const handleAddPastoButton = () => {
    const newIngredienti: IIngrediente[] = [];

    formRefs.forEach((ref) => {
      const values = ref.ref.current?.getValues();
      if (values) {
        newIngredienti.push(values);
      }
    });

    const updatedCard: ICard = {
      ...card,
      ingredienti: newIngredienti,
    };
    console.log("updatedCard", updatedCard);
    mutation.mutate({ card: updatedCard, user: user! });
  };

  const newRef = useRef<IngredientFormHandle | null>(null);

  useEffect(() => {
    if (showAddPastoDialog) {
      setCard({
        title: "",
        meal: meal,
        giorno: giornoActive,
        ingredienti: [],
        tot_peso: 0,
        tot_calorie: 0,
        tot_proteine: 0,
      });

      setFormRefs([
        {
          id: generateId(),
          ref: newRef,
        },
      ]);
    }
  }, [showAddPastoDialog, giornoActive, meal]);

  return (
    <div
      className={`card absolute top-1/4 left-1/2 -translate-x-1/2 sm:max-w-md ${
        !showAddPastoDialog ? "hidden" : ""
      }`}
    >
      <div className="card-header flex items-center justify-between">
        <span className="card-title">Aggiungi Pasto</span>
        <div className="card-actions flex flex-nowrap gap-0.5 sm:gap-3">
          <div className="tooltip">
            <button
              className="tooltip-toggle btn btn-text btn-md btn-circle"
              aria-label="Close Button"
              data-remove-element="#card-dismiss"
              onClick={handleClose}
            >
              <span className="icon-[tabler--x] size-8"></span>
            </button>
            <span
              className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
              role="tooltip"
            >
              <span className="tooltip-body">Close</span>
            </span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="input">
          <label
            className="label-text my-auto me-3 p-0"
            htmlFor="inlineLabelName"
          >
            Nome
          </label>
          <input
            type="text"
            className="grow"
            placeholder="Pasto"
            id="inlineLabelName"
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
        </div>
        <IngredientInDialog formRefs={formRefs} setFormRefs={setFormRefs} />
      </div>
      <div className="card-footer" dir="rtl">
        <button className="btn btn-primary" onClick={handleAddPastoButton}>
          Aggiungi Pasto
        </button>
      </div>
    </div>
  );
}

export default AddCardDialog;
