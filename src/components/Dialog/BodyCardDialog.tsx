import IngredientCardDialog from "./IngredientCardDialog";
import useStore from "../../store/useStore";

function BodyCardDialog() {
  const cardStore = useStore((state) => state.cardSelected);
  const addCardIngredient = useStore((state) => state.addCardIngredient);

  const handleAddIngredient = () => {
    addCardIngredient({
      name: "",
      peso: 0,
      calorie: 0,
      proteine: 0,
    });
  };

  return (
    <div className="card-body">
      <div className="flex h-full w-full flex-col">
        <div className="text-md grid w-full grid-cols-6 font-bold">
          <div className="col-span-2 pl-2 text-left">Cibo</div>
          <div className="text-right">Peso</div>
          <div className="text-right">Cal</div>
          <div className="pr-2 text-right">Prot.</div>
          <div></div>
        </div>

        <div className="flex flex-col gap-2">
          {cardStore?.ingredienti.map((ingrediente, idx) => (
            <IngredientCardDialog key={idx} item={ingrediente} index={idx} />
          ))}
          <div className="btn btn-primary" onClick={handleAddIngredient}>
            Aggiungi Cibo
          </div>
        </div>

        <div className="text-md mt-8 grid w-full grid-cols-6 items-end font-bold">
          <div className="col-span-2 pl-2 text-left">Totale</div>
          <div className="text-right">{cardStore?.tot_peso}g</div>
          <div className="text-right">{cardStore?.tot_calorie}cal</div>
          <div className="pr-2 text-right">{cardStore?.tot_proteine}g</div>
        </div>
      </div>
    </div>
  );
}

export default BodyCardDialog;
