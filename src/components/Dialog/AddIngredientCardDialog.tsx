function AddIngredientCardDialog() {
  return (
    <div className="bg-neutral-content text-md grid w-full grid-cols-5 grid-rows-1 rounded-md p-2 font-bold">
      <div className="col-span-2 text-left">
        <input type="text" className="input max-w-sm" aria-label="input" />
      </div>
      <div className="text-right">110g</div>
      <div className="text-right">40cal</div>
      <div className="text-right">11g</div>
    </div>
  );
}

export default AddIngredientCardDialog;
