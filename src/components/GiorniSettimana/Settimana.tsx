import { useCallback } from "react";
import useStore from "../../store/useStore";
import type { TGiorno } from "../../interfaces/ICard";

function Settimana() {
  const giorno = useStore((state) => state.giornoActive.giorno);
  const setGiornoActive = useStore((state) => state.setGiornoActive);

  const handleSetActiveDay = useCallback(
    (giorno: TGiorno) => {
      setGiornoActive(giorno);
    },
    [setGiornoActive],
  );

  const giorni: TGiorno[] = [
    "Lunedi",
    "Martedi",
    "Mercoledi",
    "Giovedi",
    "Venerdi",
    "Sabato",
    "Domenica",
  ];

  return (
    <div className="flex justify-center">
      <ul className="menu menu-horizontal w-fit">
        {giorni.map((g) => (
          <li key={g}>
            <a
              className={giorno === g ? "menu-active" : ""}
              onClick={() => handleSetActiveDay(g)}
            >
              {g}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Settimana;
