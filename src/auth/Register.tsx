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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm">
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Registrati
        </button>
        <p className="mt-4 text-center">
          Hai già un account?{" "}
          <Link to="/login" className="text-blue-600">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
