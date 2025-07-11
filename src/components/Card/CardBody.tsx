import { useCard } from "./CardContext";
import Ingredient from "./Ingredient";

function CardBody() {
  const { card } = useCard();

  return (
    <div className="card-body">
      <div className="flex h-full w-full flex-col">
        <div className="text-md mb-1 grid w-full grid-cols-5 grid-rows-1 border-b border-none px-2 font-bold">
          <div className="col-span-2 text-left">Cibo</div>
          <div className="text-right">Peso</div>
          <div className="text-right">Cal</div>
          <div className="text-right">Prot.</div>
        </div>

        <div className="flex flex-col gap-2">
          {card.ingredienti.map((ingrediente, idx) => (
            <Ingredient key={idx} item={ingrediente} />
          ))}
        </div>

        <div className="text-md mt-8 grid h-full w-full grid-cols-5 grid-rows-1 items-end border-b border-none px-2 font-bold">
          <div className="col-span-2 text-left">Totale</div>
          <div className="text-right">{card.tot_peso}g</div>
          <div className="text-right">{card.tot_calorie}cal</div>
          <div className="text-right">{card.tot_proteine}g</div>
        </div>
      </div>
    </div>
  );
}

export default CardBody;
