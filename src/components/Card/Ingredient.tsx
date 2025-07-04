import type { IIngrediente } from "../../interfaces/ICard";

interface Props {
  item: IIngrediente;
}
function Ingredient({ item }: Props) {
  return (
    <div className="bg-neutral-content text-md grid w-full grid-cols-5 grid-rows-1 rounded-md p-2 font-bold">
      <div className="col-span-2 text-left">{item.name}</div>
      <div className="text-right">{item.peso}</div>
      <div className="text-right">{item.calorie}</div>
      <div className="text-right">{item.proteine}</div>
    </div>
  );
}

export default Ingredient;
