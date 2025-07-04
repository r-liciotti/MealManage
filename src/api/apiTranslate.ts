import axios from "axios";

const translateText = async (text: string) => {

    try {
        const response = await axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|it`);
        return await response.data.responseData.translatedText;;
    } catch (error) {
        console.log("error :", error.response);
    }

};

// console.log("translate", translateText("hello"));
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["translation", "hello"], // "hello" è il testo da tradurre
//     queryFn: () => translateText("Tomato"),
//     staleTime: 1000 * 60, // cache per 1 minuto
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error during translation</p>;

export default translateText;