import type { ICard } from "../../interfaces/ICard";
import CardBody from "./CardBody";
import { CardContext } from "./CardContext";
import CardHeader from "./CardHeader";

interface Props {
  card: ICard;
}
function Card({ card }: Props) {
  return (
    <CardContext.Provider value={{ card: card }}>
      <div className="card w-full max-w-sm">
        <CardHeader />
        <CardBody />
      </div>
    </CardContext.Provider>
  );
}

export default Card;
