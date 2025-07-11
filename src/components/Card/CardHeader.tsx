import { removePasto } from "../../api/apiSupabase";
import { useAuth } from "../../auth/AuthProvider";
import useStore from "../../store/useStore";
import { useCard } from "./CardContext";
import { useQueryClient } from "@tanstack/react-query";

function CardHeader() {
  const { card } = useCard();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleEditCard = () => {
    console.log("Card clicked: ", card);
    useStore.setState({ cardSelected: card });
    useStore.getState().toggleEditPastoDialog();
  };

  const handleRemoveCard = async () => {
    if (!user) return;
    try {
      await removePasto(card, user);
      queryClient.invalidateQueries({
        queryKey: ["pasti", card.giorno, card.meal],
      });
      // 🔄 Rimuovi la card visivamente, es: chiama una funzione passata via props o aggiorna uno stato globale
      console.log("Pasto rimosso con successo");
    } catch (error) {
      console.error("Errore nella rimozione del pasto:", error);
    }
  };

  return (
    <div className="card-header flex items-center justify-between">
      <span className="card-title">{card.title}</span>
      <div className="card-actions flex flex-nowrap gap-0.5 sm:gap-3">
        <div className="tooltip">
          <button
            className="tooltip-toggle btn btn-text btn-md btn-circle"
            aria-label="Edit Button"
            data-remove-element="#card-edit"
            onClick={handleEditCard}
          >
            <span className="icon-[tabler--edit] size-7"></span>
          </button>
          <span
            className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
            role="tooltip"
          >
            <span className="tooltip-body">Modifica</span>
          </span>
        </div>

        <div className="tooltip">
          <button
            className="tooltip-toggle btn btn-text btn-md btn-circle"
            aria-label="Close Button"
            data-remove-element="#card-dismiss"
            onClick={handleRemoveCard}
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
  );
}

export default CardHeader;
