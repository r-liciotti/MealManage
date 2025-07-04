import CardsContainer from "../components/Card Container/CardsContainer";
import AddCardDialog from "../components/Dialog/AddCardDialog";
import Settimana from "../components/GiorniSettimana/Settimana";

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Settimana />
      <CardsContainer mealName="Colazione" />
      <CardsContainer mealName="Pranzo" />
      <CardsContainer mealName="Merenda" />
      <CardsContainer mealName="Cena" />
      <AddCardDialog />
    </div>
  );
}

export default Home;
