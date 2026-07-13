import { useEffect, useState } from "react";
import { fetchProfile, updateProfile, type Profile } from "../services/auth";

const fieldClass = "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

export default function ProfileSettings() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile().then(setProfile).catch((err) => {
      setError(err?.response?.data?.message || "Unable to load your profile.");
    });
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await updateProfile({
        email: profile.email,
        username: profile.username,
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
      });
      setProfile(updated);
      setMessage("Profile updated successfully.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (!profile && !error) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-md">Loading profile settings...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Account</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Profile settings</h2>
        <p className="mt-2 text-sm text-slate-500">Update the details shown with your uploads.</p>
      </div>

      {error && <p className="mb-5 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}

      {profile && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>First name</span>
              <input className={fieldClass} value={profile.firstName ?? ""} onChange={(event) => setProfile({ ...profile, firstName: event.target.value })} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Last name</span>
              <input className={fieldClass} value={profile.lastName ?? ""} onChange={(event) => setProfile({ ...profile, lastName: event.target.value })} />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            <span>Username</span>
            <input className={fieldClass} minLength={3} maxLength={20} required value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value })} />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            <span>Email address</span>
            <input className={fieldClass} type="email" required value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
          </label>
          <button disabled={saving} className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Saving..." : "Save changes"}
          </button>
          {message && <p className="text-sm text-emerald-600">{message}</p>}
        </form>
      )}
    </div>
  );
}
