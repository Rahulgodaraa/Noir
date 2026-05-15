"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    loading: false,
    done: false,
  });

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    tl.from(".contact-header", { y: 30, opacity: 0 })
      .from(".contact-content", { y: 30, opacity: 0 }, "-=0.6");
  }, { scope: containerRef });

  const submit = async (e: React.FormEvent) => {
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

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="contact-header text-center mb-24">
          <span className="text-[#D4AF37] tracking-[0.4em] text-[10px] uppercase font-bold mb-4 block">Get in Touch</span>
          <h1 className="font-serif text-5xl md:text-8xl mb-8 font-light">Contact the House</h1>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Whether you have a question about our collections or wish to 
            book a private consultation, our concierge is here to assist you.
          </p>
        </div>

        {/* Content */}
        <div className="contact-content grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-16">
            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-12 h-12 glass flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">Concierge</h4>
                  <p className="text-xl font-light hover:text-[#D4AF37] transition-colors">
                    <a href="tel:+919414082182">+91 94140 82182</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 glass flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">Inquiries</h4>
                  <p className="text-xl font-light hover:text-[#D4AF37] transition-colors">
                    maison@noiressence.com
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 glass flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">WhatsApp</h4>
                  <p className="text-xl font-light hover:text-[#D4AF37] transition-colors">
                    <a href="https://wa.me/919414082182" target="_blank">Chat with us</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 glass flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">Atelier</h4>
                  <p className="text-xl font-light">
                    The Pink City, Jaipur, India
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-10 space-y-6">
              <h4 className="font-serif text-2xl">Jaipur Heritage</h4>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                Our atelier is located in the heart of Jaipur, where we blend 
                traditional craftsmanship with modern olfactory science. 
                Visits are strictly by appointment only.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={submit} className="glass p-10 md:p-16 space-y-10 relative overflow-hidden">
            <div className="space-y-2">
              <h3 className="font-serif text-4xl">Send a Message</h3>
              <p className="text-white/40 text-sm">We typically respond within 24 business hours.</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-[#D4AF37] transition-colors">Full Name</label>
                <input
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#D4AF37] transition-all font-light"
                  placeholder="Enter your name"
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-[#D4AF37] transition-colors">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#D4AF37] transition-all font-light"
                  placeholder="example@email.com"
                  value={state.email}
                  onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-[#D4AF37] transition-colors">Your Message</label>
                <textarea
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#D4AF37] transition-all font-light min-h-[120px] resize-none"
                  placeholder="How can we help you?"
                  value={state.message}
                  onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state.loading}
              className="w-full btn-gold py-5 uppercase tracking-[0.3em] text-[10px] font-bold"
            >
              {state.loading ? "Sending..." : state.done ? "Message Sent ✓" : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
