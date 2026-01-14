"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ContactForm() {
  const { theme } = useTheme();

  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    loading: false,
    done: false,
  });

  const submit = async (e) => {
    e.preventDefault();
    setState((s) => ({ ...s, loading: true }));

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        message: state.message,
      }),
    });

    if (res.ok) {
      setState({
        name: "",
        email: "",
        message: "",
        loading: false,
        done: true,
      });
      setTimeout(() => setState((s) => ({ ...s, done: false })), 3500);
    } else {
      setState((s) => ({ ...s, loading: false }));
      alert("Error sending email");
    }
  };

  const isDark = theme === "dark";

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div
        className={`grid md:grid-cols-2 gap-10 rounded-xl p-8 shadow-lg
          ${isDark ? "bg-[#0b0b0b]" : "bg-gray-100"}
        `}
      >

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-serif text-[#d4af37] mb-4">
            Get in Touch
          </h2>

          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Have a question, project idea, or just want to say hi?  
            Reach out — we usually respond within 24 hours.
          </p>

          <div className={`space-y-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            <p>
              📞{" "}
              <a
                href="tel:+919876543210"
                className="text-[#d4af37] hover:underline"
              >
                +91 98765 43210
              </a>
            </p>

            <p>
              💬{" "}
              <a
                href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20know%20more"
                target="_blank"
                className="text-green-500 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </p>

            <p>
              ✉️{" "}
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                support@example.com
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <form
          onSubmit={submit}
          className={`p-6 rounded-lg
            ${isDark ? "bg-[#111]" : "bg-white"}
          `}
        >
          <h4 className="text-2xl font-serif text-[#d4af37] mb-4">
            Contact Us
          </h4>

          <input
            className={`w-full mb-3 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]
              ${isDark ? "bg-[#0b0b0b] text-white" : "bg-gray-100 text-black"}
            `}
            placeholder="Your Name"
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            required
          />

          <input
            type="email"
            className={`w-full mb-3 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]
              ${isDark ? "bg-[#0b0b0b] text-white" : "bg-gray-100 text-black"}
            `}
            placeholder="Your Email"
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            required
          />

          <textarea
            className={`w-full mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]
              ${isDark ? "bg-[#0b0b0b] text-white" : "bg-gray-100 text-black"}
            `}
            placeholder="Your Message"
            rows={5}
            value={state.message}
            onChange={(e) =>
              setState((s) => ({ ...s, message: e.target.value }))
            }
            required
          />

          <button
            type="submit"
            disabled={state.loading}
            className="w-full py-3 bg-[#d4af37] text-black rounded font-semibold hover:opacity-90 transition"
          >
            {state.loading
              ? "Sending..."
              : state.done
              ? "Message Sent ✓"
              : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
