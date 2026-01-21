"use client";
import { signIn } from "next-auth/react";

const providers = [
  { id: "google", name: "Google" },
  { id: "github", name: "GitHub" }
];

export function SignIn() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-xl font-semibold">Sign in</h2>
      {providers.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => signIn(id)}
          className="px-4 py-2 rounded bg-blue-600 text-white w-60 shadow hover:bg-blue-700 transition"
        >
          Sign in with {name}
        </button>
      ))}
    </div>
  );
}
