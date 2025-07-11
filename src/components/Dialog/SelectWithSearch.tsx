import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import getNutritionInfo from "../../api/apiNinjaCalories";
import type { IIngrediente } from "../../interfaces/ICard";

function SelectWithSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate, data, isPending, error } = useMutation<
    IIngrediente | null,
    Error,
    string
  >({
    mutationFn: getNutritionInfo,
    onSuccess: (data) => {
      useStore;
      console.log("Found ingredient:", data);
    },
    onError: (error) => {
      console.error("Error during search:", error);
    },
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      mutate(searchTerm.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="join max-w-sm">
        <input
          className="input join-item"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-outline btn-primary join-item px-1"
        >
          <span className="icon-[tabler--search] size-5" />
        </button>
      </div>

      {isPending && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="mt-2 text-sm text-green-600">
          {data.name} – {data.calorie} kcal – {data.proteine} g proteine
        </div>
      )}
    </div>
  );
}

export default SelectWithSearch;
