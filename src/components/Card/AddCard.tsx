import type { ICard, TMeal } from "../../interfaces/ICard";
import useStore from "../../store/useStore";

interface Props {
  meal: TMeal;
}
function AddCard({ meal }: Props) {
  const handleClick = () => {
    useStore.setState({ mealSelected: meal });
    const newCard: ICard = {
      title: "",
      meal: meal,
      giorno: useStore.getState().giornoActive.giorno,
      ingredienti: [],
      tot_calorie: 0,
      tot_peso: 0,
      tot_proteine: 0,
      new: true,
    };
    useStore.setState({ cardSelected: newCard });
    useStore.getState().toggleEditPastoDialog();
    //toggleAddPastoDialog();
  };
  return (
    <div className="btn btn-outline h-auto sm:max-w-md" onClick={handleClick}>
      <button className="btn btn-text btn-circle" aria-label="Add Card">
        <span className="icon-[tabler--plus] size-8"></span>
      </button>
    </div>
  );
}

export default AddCard;
