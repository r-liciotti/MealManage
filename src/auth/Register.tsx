import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="card w-full max-w-sm p-4">
        <div className="card-body">
          <h5 className="card-title mb-2.5">Register</h5>

          <input
            className="input max-w-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input max-w-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mb-2 text-red-500">{error}</p>}
          <button onClick={handleRegister} className="btn btn-primary">
            Registrati
          </button>
          <p className="mt-4 text-center">
            Hai già un account?{" "}
            <Link to="/login" className="text-info font-bold">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
