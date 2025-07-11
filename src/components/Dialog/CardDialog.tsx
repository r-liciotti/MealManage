import { useEffect } from "react";
import useStore from "../../store/useStore";
import BodyCardDialog from "./BodyCardDialog";
import HeaderCardDialog from "./HeaderCardDialog";

function CardDialog() {
  const cardStore = useStore((state) => state.cardSelected);
  const showEditPastoDialog = useStore((state) => state.showEditPastoDialog);
  const insertOrUpload = cardStore?.new ? "insert" : "update";
  useEffect(() => {
    console.log("cardStore", cardStore, insertOrUpload);
  }, [cardStore]);

  if (cardStore === null) return null;

  return (
    <div
      className={`${showEditPastoDialog ? "block" : "hidden"}`}
      id="cardDialog"
    >
      <div className="bg-base-300/95 absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
        <div className="card w-full max-w-md">
          <HeaderCardDialog card={cardStore} insertOrUpload={insertOrUpload} />
          <BodyCardDialog />
        </div>
      </div>
    </div>
  );
}

export default CardDialog;
