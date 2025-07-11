import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";

function Logout() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Chiude il popover cliccando fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !popoverRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    navigate("/");
  };
  return (
    <div className="relative flex h-full items-center justify-center">
      <button
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        className="btn btn-primary h-auto px-2 py-2"
        ref={buttonRef}
      >
        <span className="icon-[mdi-light--logout] size-8" />
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="card absolute top-16 right-0 z-10 w-64"
        >
          <div className="card-body">
            <p className="mb-4">Sei sicuro di voler uscire?</p>
            <button className="btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
