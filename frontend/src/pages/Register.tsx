import { useState } from "react";
import { authRegister } from "../services/auth";
import { EnvelopeIcon, LockIcon, UserCircleIcon } from "../components/icons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await authRegister({ email, username, password });
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Register failed");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Create Your Account</h2>
        <p className="text-sm text-slate-500">Join Devtube to upload and explore new videos.</p>
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
          <label className="block text-sm font-medium text-slate-700">Username</label>
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
            <UserCircleIcon className="h-5 w-5 text-slate-500" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Choose a username"
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
              placeholder="Create a password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Register
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
