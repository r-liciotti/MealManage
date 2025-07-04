import type { User } from "@supabase/supabase-js";
import type { ICard, IIngrediente, TGiorno, TMeal } from "../interfaces/ICard";
import { supabase } from "../lib/supabase";


export const fetchPasti = async (
    giorno: TGiorno,
    meal: TMeal,
    user: User
): Promise<ICard[]> => {
    const { data, error } = await supabase
        .from("Pasto")
        .select(`
       id,
    nomePasto,
    orarioPasto,
    giornoSettimana,
    idAuth,
    PastoIngredienti (
      ingredienteId,
      Ingrediente (
        id,
        nomeIngrediente,
        peso,
        calorie,
        proteine
        )
      )
    `).eq("giornoSettimana", giorno).eq("orarioPasto", meal).eq("idAuth", user.id);

    if (error) throw error;

    console.log("data", data);

    // Trasforma i dati grezzi in ICard[]
    const cards: ICard[] = (data || []).map((pasto): ICard => {
        const ingredienti: IIngrediente[] =
            (pasto.PastoIngredienti || []).map((pi: any) => ({
                name: pi.Ingrediente?.nomeIngrediente || "",
                peso: pi.Ingrediente?.peso || 0,
                calorie: pi.Ingrediente?.calorie || 0,
                proteine: pi.Ingrediente?.proteine || 0,
            })) ?? [];

        const tot_peso = ingredienti.reduce((sum, ing) => sum + ing.peso, 0);
        const tot_calorie = ingredienti.reduce((sum, ing) => sum + ing.calorie, 0);
        const tot_proteine = ingredienti.reduce(
            (sum, ing) => sum + ing.proteine,
            0
        );
        return {
            id: pasto.id,
            title: pasto.nomePasto,
            meal: meal,
            ingredienti,
            tot_peso,
            tot_calorie,
            tot_proteine,
            giorno: pasto.giornoSettimana
        };
    });

    return cards;
};

export async function insertPasto(card: ICard, user: User) {

    const { data: pastoData, error: pastoError } = await supabase
        .from('Pasto')
        .insert([
            { nomePasto: card.title, orarioPasto: card.meal, giornoSettimana: card.giorno, idAuth: user.id },
        ])
        .select("id")

    if (pastoError) {
        throw new Error(`Errore inserimento pasto: ${pastoError.message}`)
    }
    if (!pastoData || pastoData.length === 0) {
        throw new Error('Nessun pasto inserito')
    }

    const { data: ingredientiData, error: ingredienteError } = await supabase
        .from('Ingrediente')
        .insert(
            card.ingredienti.map((ingrediente) => ({
                nomeIngrediente: ingrediente.name,
                peso: ingrediente.peso,
                calorie: ingrediente.calorie,
                proteine: ingrediente.proteine
            }))
        )
        .select("id")
    if (ingredienteError) {
        throw new Error(`Errore inserimento ingredienti: ${ingredienteError.message}`)
    }
    if (!ingredientiData || ingredientiData.length === 0) {
        throw new Error('Nessun ingrediente inserito')
    }
    const { error: pastoIngredientiError } = await supabase
        .from('PastoIngredienti')
        .insert(ingredientiData.map((ingrediente) => ({
            ingredienteId: ingrediente.id,
            pastoId: pastoData[0].id
        })))
        .select()

    if (pastoIngredientiError) {
        throw new Error(`Errore inserimento pastoIngredienti: ${pastoIngredientiError.message}`)
        return false
    }

    return true;
}

export async function removePasto(card: ICard, user: User) {
    // 1. Recupera l'id del pasto
    const { error: fetchPastoError } = await supabase
        .from("Pasto")
        .select("id")
        .eq("id", card.id)
        .eq("idAuth", user.id)
        .single();

    if (fetchPastoError) {
        throw new Error(`Errore nel recupero del pasto: ${fetchPastoError.message}`);
    }


    // 2. Recupera gli ID degli ingredienti associati al pasto
    const { data: pastoIngredienti, error: fetchPIError } = await supabase
        .from("PastoIngredienti")
        .select("ingredienteId")
        .eq("pastoId", card.id);

    if (fetchPIError) {
        throw new Error(`Errore nel recupero dei PastoIngredienti: ${fetchPIError.message}`);
    }

    const ingredientiIds = pastoIngredienti.map(pi => pi.ingredienteId);


    // 4. Elimina gli ingredienti (tutti quelli associati a questo pasto)
    const { error: deleteIngredientiError } = await supabase
        .from("Ingrediente")
        .delete()
        .in("id", ingredientiIds);

    if (deleteIngredientiError) {
        throw new Error(`Errore nell'eliminazione degli ingredienti: ${deleteIngredientiError.message}`);
    }

    // 5. Elimina il pasto
    const { error: deletePastoError } = await supabase
        .from("Pasto")
        .delete()
        .eq("id", card.id);

    if (deletePastoError) {
        throw new Error(`Errore nell'eliminazione del pasto: ${deletePastoError.message}`);
    }

    return true;
}


