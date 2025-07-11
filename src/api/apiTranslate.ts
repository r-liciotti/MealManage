import axios from "axios";

const translateText = async (text: string) => {
    try {
        const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${text}&langpair=it|en`
        );
        return response.data.responseData.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return text; // fallback al testo originale
    }
};

export default translateText;