import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return setError(error.message);

    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <input
          className="mb-2 w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-2 w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Non hai un account?{" "}
          <Link to="/register" className="text-blue-600">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
