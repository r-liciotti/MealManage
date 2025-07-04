import { useQuery } from "@tanstack/react-query";
import type { TMeal } from "../../interfaces/ICard";
import useStore from "../../store/useStore";
import AddCard from "../Card/AddCard";
import Card from "../Card/Card";
import { fetchPasti } from "../../api/apiSupabase";
import { useAuth } from "../../auth/AuthProvider";

interface Props {
  mealName: TMeal;
}
function CardsContainer({ mealName }: Props) {
  const giornoActive = useStore((state) => state.giornoActive.giorno);
  const { user } = useAuth();

  const { data: pasti, isLoading } = useQuery({
    queryKey: ["pasti", giornoActive, mealName],
    queryFn: () => {
      if (!user) return Promise.resolve([]); // oppure puoi throware
      return fetchPasti(giornoActive, mealName, user);
    },
    enabled: !!user, // solo se user esiste
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex w-full justify-between">
        <h3 className="text-3xl font-bold">{mealName}</h3>
        <div className="flex gap-3">
          <div className="btn btn-soft btn-primary flex h-fit flex-col gap-0">
            <p>Peso</p>
            <p>{pasti?.reduce((acc, card) => acc + card.tot_peso, 0)}g</p>
          </div>
          <div className="btn btn-soft btn-primary flex h-fit flex-col gap-0">
            <p>Calorie</p>
            <p>{pasti?.reduce((acc, card) => acc + card.tot_calorie, 0)}cal</p>
          </div>
          <div className="btn btn-soft btn-primary flex h-fit flex-col gap-0">
            <p>Proteine</p>
            <p>{pasti?.reduce((acc, card) => acc + card.tot_proteine, 0)}g</p>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        {pasti?.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
        <AddCard meal={mealName} />
      </div>
    </div>
  );
}

export default CardsContainer;
