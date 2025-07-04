import { create } from 'zustand';
import type { ICard, IDay, TGiorno, TMeal } from '../interfaces/ICard';


const giorniInit: IDay[] = [
    { giorno: "Lunedi", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Martedi", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Mercoledi", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Giovedi", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Venerdi", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Sabato", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
    { giorno: "Domenica", cards: [], tot_peso: 0, tot_calorie: 0, tot_proteine: 0 },
];

export interface StoreState {
    giorni: IDay[];
    giornoActive: IDay;
    cardSelected: ICard | null;
    showAddIngredientDialog: boolean;
    showAddPastoDialog: boolean;
    mealSelected: TMeal;
    toggleAddIngredientDialog: () => void;
    toggleAddPastoDialog: () => void;
    setGiornoActive: (giorno: TGiorno) => void;
    setMeal: (meal: TMeal) => void;
    setCardSelected: (card: ICard | null) => void;

}

export const useStore = create<StoreState>(set => ({
    cardSelected: null,
    giorni: giorniInit,
    giornoActive: giorniInit[0],
    showAddIngredientDialog: false,
    showAddPastoDialog: false,
    mealSelected: "",
    returnState: () => { return useStore.getState().giorni },
    toggleAddIngredientDialog: () => set(state => ({ showAddIngredientDialog: !state.showAddIngredientDialog })),
    toggleAddPastoDialog: () => set(state => ({ showAddPastoDialog: !state.showAddPastoDialog })),
    setGiornoActive: (giorno: TGiorno) =>
        set(state => {
            const nuovoGiorno = state.giorni.find((g) => g.giorno === giorno);
            if (!nuovoGiorno || nuovoGiorno.giorno === state.giornoActive.giorno) return state;
            return { giornoActive: nuovoGiorno };
        }),
    setMeal: (meal: TMeal) => set(({ mealSelected: meal })),
    setCardSelected: (card: ICard | null) => set(({ cardSelected: card }))

}));

export default useStore