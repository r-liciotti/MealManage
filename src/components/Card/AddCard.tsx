import type { TMeal } from "../../interfaces/ICard";
import useStore from "../../store/useStore";

interface Props {
  meal: TMeal;
}
function AddCard({ meal }: Props) {
  const toggleAddPastoDialog = useStore((state) => state.toggleAddPastoDialog);
  const handleClick = () => {
    useStore.setState({ mealSelected: meal });
    toggleAddPastoDialog();
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
