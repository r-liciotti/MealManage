import CardsContainer from "../components/Card Container/CardsContainer";
import AddCardDialog from "../components/Dialog/AddCardDialog";
import CardDialog from "../components/Dialog/CardDialog";
import Header from "../components/Header/Header";

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <CardsContainer mealName="Colazione" />
      <CardsContainer mealName="Pranzo" />
      <CardsContainer mealName="Merenda" />
      <CardsContainer mealName="Cena" />
      <AddCardDialog />
      <CardDialog />
    </div>
  );
}

export default Home;
