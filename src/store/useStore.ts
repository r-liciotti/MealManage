import { create } from 'zustand';
import type { ICard, IDay, IIngrediente, TGiorno, TMeal } from '../interfaces/ICard';


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
    showAddPastoDialog: boolean;
    showEditPastoDialog: boolean;
    mealSelected: TMeal;
    ingredient100g: IIngrediente | null;
    toggleAddPastoDialog: () => void;
    toggleEditPastoDialog: () => void;
    setGiornoActive: (giorno: TGiorno) => void;
    setMeal: (meal: TMeal) => void;
    setCardSelected: (card: ICard | null) => void;
    updateCardTitle: (title: string) => void;
    updateCardIngredient: (index: number, ingrediente: IIngrediente) => void;
    updateCardIngredients: (ingredienti: IIngrediente[]) => void;
    addCardIngredient: (ingrediente: IIngrediente) => void;
    setIngredient100g: (ingrediente: IIngrediente | null) => void;
}

export const useStore = create<StoreState>(set => ({
    cardSelected: null,
    giorni: giorniInit,
    giornoActive: giorniInit[0],
    showAddPastoDialog: false,
    showEditPastoDialog: false,
    mealSelected: "",
    ingredient100g: null,
    returnState: () => { return useStore.getState().giorni },
    toggleAddPastoDialog: () => set(state => ({ showAddPastoDialog: !state.showAddPastoDialog })),
    toggleEditPastoDialog: () => set(state => ({ showEditPastoDialog: !state.showEditPastoDialog })),
    setGiornoActive: (giorno: TGiorno) =>
        set(state => {
            const nuovoGiorno = state.giorni.find((g) => g.giorno === giorno);
            if (!nuovoGiorno || nuovoGiorno.giorno === state.giornoActive.giorno) return state;
            return { giornoActive: nuovoGiorno };
        }),
    setMeal: (meal: TMeal) => set(({ mealSelected: meal })),
    setCardSelected: (card: ICard | null) => set(({ cardSelected: card })),
    updateCardTitle: (title: string) => set(state => {
        if (state.cardSelected) {
            return { cardSelected: { ...state.cardSelected, title } };
        } else {
            return state;
        }
    }),
    updateCardIngredients: (ingredienti: IIngrediente[]) => set(state => {
        if (state.cardSelected) {
            return { cardSelected: { ...state.cardSelected, ingredienti } };
        }
        return state;
    }),
    updateCardIngredient: (index: number, ingrediente: IIngrediente) => set(state => {
        if (state.cardSelected) {
            const ingredienti = [...state.cardSelected.ingredienti];
            ingredienti[index] = ingrediente;
            const totali = calcolaTotali(ingredienti);

            return {
                cardSelected: {
                    ...state.cardSelected,
                    ingredienti,
                    tot_peso: totali.tot_peso,
                    tot_calorie: totali.tot_calorie,
                    tot_proteine: totali.tot_proteine
                },
            };
        }
        return state;
    }),
    addCardIngredient: (ingrediente: IIngrediente) => set(state => {
        if (state.cardSelected) {
            return {
                cardSelected: {
                    ...state.cardSelected,
                    ingredienti: [...state.cardSelected.ingredienti, ingrediente],
                },
            };
        }
        return state;
    }),
    setIngredient100g: (ingrediente: IIngrediente | null) => set(({ ingredient100g: ingrediente }), false),

}));

function calcolaTotali(ingredienti: IIngrediente[]) {
    const totali = ingredienti.reduce(
        (acc, ingrediente) => {
            acc.tot_peso += ingrediente.peso;
            acc.tot_calorie += ingrediente.calorie;
            acc.tot_proteine += ingrediente.proteine;
            return acc;
        },
        { tot_peso: 0, tot_calorie: 0, tot_proteine: 0 }
    );

    return {
        tot_peso: parseFloat(totali.tot_peso.toFixed(1)),
        tot_calorie: parseFloat(totali.tot_calorie.toFixed(1)),
        tot_proteine: parseFloat(totali.tot_proteine.toFixed(1)),
    };
}



export default useStore