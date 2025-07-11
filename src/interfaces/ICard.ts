export type TGiorno = "Lunedi" | "Martedi" | "Mercoledi" | "Giovedi" | "Venerdi" | "Sabato" | "Domenica";
export type TMeal = "Colazione" | "Pranzo" | "Merenda" | "Cena" | "Spuntino" | "";

export interface IDay {
    giorno: TGiorno;
    cards: ICard[];
    tot_peso: number;
    tot_calorie: number;
    tot_proteine: number;
}

export interface ICard {
    id?: number;
    title: string;
    meal: TMeal;
    giorno: TGiorno;
    ingredienti: IIngrediente[];
    tot_peso: number;
    tot_calorie: number;
    tot_proteine: number;
    new?: boolean
}
export interface IIngrediente {
    name: string;
    peso: number;
    calorie: number;
    proteine: number;
}

export interface IPasto {
    id: number; // bigint
    nomePasto: string | null;
    orarioPasto: string | null;
    giornoSettimana: string | null;
    idAuth: string | null; // UUID
    created_at: string; // ISO timestamp (es. "2025-06-30T12:34:56Z")
}

