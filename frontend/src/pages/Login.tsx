import { useState } from "react";
import { authLogin } from "../services/auth";
import { EnvelopeIcon, LockIcon } from "../components/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await authLogin({ email, password });
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Welcome Back</h2>
        <p className="text-sm text-slate-500">Log in to continue watching and uploading videos.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
            <EnvelopeIcon className="h-5 w-5 text-slate-500" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
            <LockIcon className="h-5 w-5 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
