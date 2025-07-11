import axios from "axios";
import translateText from "./apiTranslate";
import type { IIngrediente } from "../interfaces/ICard";


const getNutritionInfo = async (nameIngredient: string, peso: string) => {
    const query = peso + "g " + await translateText(nameIngredient);
    console.log("query", query);
    try {
        const response = await axios.get("https://api.calorieninjas.com/v1/nutrition", {
            params: { query },
            headers: {
                "X-Api-Key": import.meta.env.VITE_CALORIENINNJAS_KEY,
                "Content-Type": "application/json",
            },
        });

        console.log("getNutritionInfo", response.data);
        const item = response.data.items[0];
        if (!item) return null;

        const ingrediente: IIngrediente = {
            name: item.name,
            peso: item.serving_size_g,
            calorie: item.calories,
            proteine: item.protein_g,
        };

        return ingrediente;
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message || error);
        throw error;
    }
};

export default getNutritionInfo;