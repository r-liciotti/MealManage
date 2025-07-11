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
      <div className="card w-full max-w-sm p-4">
        <div className="card-body">
          <h5 className="card-title mb-2.5">Login</h5>
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
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
          <p className="mt-4 text-center">
            Non hai un account?{" "}
            <Link to="/register" className="text-info font-bold">
              Registrati
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
