"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0e] p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <h1 className="font-sans font-bold text-xl mb-6 text-white">Admin Login</h1>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 mb-4 font-sans"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-primary/20 mb-6 font-sans"
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-accent text-primary font-semibold btn-magnetic"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
