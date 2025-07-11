import Settimana from "../GiorniSettimana/Settimana";
import Logout from "../../auth/Logout";

function Header() {
  return (
    <div className="grid w-full grid-cols-5 grid-rows-1 gap-4">
      <div className="col-span-3 col-start-2">
        <Settimana />
      </div>
      <div className="col-start-5 justify-items-end">
        <Logout />
      </div>
    </div>
  );
}

export default Header;
