import { useAuth } from "../../auth/AuthProvider";
import useStore from "../../store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICard } from "../../interfaces/ICard";
import { insertPasto, updatePasto } from "../../api/apiSupabase";

interface Props {
  card: ICard;
  insertOrUpload: "insert" | "update";
}
function HeaderCardDialog({ card, insertOrUpload }: Props) {
  const updateTitleCard = useStore((state) => state.updateCardTitle);

  //const [title, setTitle] = useState(card.title);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updatePastoMutation = useMutation({
    mutationFn: () =>
      insertOrUpload === "insert"
        ? insertPasto(card, user!)
        : updatePasto(card, user!),
    onSuccess: () => {
      // Invalida la query dei pasti per ricaricarla
      queryClient.invalidateQueries({
        queryKey: ["pasti", card.giorno, card.meal],
      });
      console.log("Card saved: ", card);
      useStore.getState().toggleEditPastoDialog();
    },
    onError: (error) => {
      console.error("Errore durante l'update del pasto:", error);
    },
  });

  const handleRemoveCard = async () => {
    useStore.getState().toggleEditPastoDialog();
  };

  const handleSaveUpdateCard = async () => {
    updatePastoMutation.mutate();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    updateTitleCard(e.target.value);
    console.log("card.title", card.title);
  };

  return (
    <div className="card-header flex items-center justify-between">
      <span className="card-title">
        <input
          type="text "
          className="input card-title max-w-sm"
          aria-label="input"
          onChange={handleChangeTitle}
          value={card.title}
        />
      </span>
      <div className="card-actions flex flex-nowrap gap-0.5 sm:gap-0">
        <div className="tooltip">
          <button
            className="tooltip-toggle btn btn-text btn-md btn-circle"
            aria-label="Save Button"
            data-remove-element="#card-save"
            onClick={handleSaveUpdateCard}
          >
            <span className="icon-[material-symbols--save-rounded] size-7"></span>
          </button>
          <span
            className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
            role="tooltip"
          >
            <span className="tooltip-body">Save Card</span>
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

export default HeaderCardDialog;
