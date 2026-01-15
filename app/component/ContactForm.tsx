"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "", loading: false, done: false });

  const submit = async (e : React.FormEvent) => {
    e.preventDefault();
    setState((s) => ({ ...s, loading: true }));

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.name, email: state.email, message: state.message }),
    });

    if (res.ok) {
      setState({ name: "", email: "", message: "", loading: false, done: true });
      setTimeout(() => setState((s) => ({ ...s, done: false })), 3500);
    } else {
      setState((s) => ({ ...s, loading: false }));
      alert("Error sending email");
    }
  };

  return (
    <form onSubmit={submit} className="bg-[#0b0b0b] p-6 rounded-lg">
      <h4 className="text-2xl font-serif text-[#d4af37] mb-4">Contact Us</h4>
      <input className="w-full mb-3 p-3 bg-[#111] text-white rounded" placeholder="Name" value={state.name} onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))} required />
      <input type="email" className="w-full mb-3 p-3 bg-[#111] text-white rounded" placeholder="Email" value={state.email} onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))} required />
      <textarea className="w-full mb-3 p-3 bg-[#111] text-white rounded" placeholder="Message" rows={5} value={state.message} onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))} required />
      <button type="submit" disabled={state.loading} className="px-4 py-2 bg-[#d4af37] text-black rounded font-semibold">
        {state.loading ? "Sending..." : state.done ? "Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}
