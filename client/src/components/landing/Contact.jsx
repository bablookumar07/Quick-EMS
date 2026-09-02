import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* =====================================
            Final CTA
        ====================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-900 p-8 sm:p-12 lg:p-16">

          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative max-w-3xl">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-300/20 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold">

              <MessageSquare size={14} />

              Ready to get started?

            </div>

            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">

              Make employee management

              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                beautifully simple.
              </span>

            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Bring your people, attendance, leaves and payroll
              together in one modern workspace.
            </p>

          </div>

        </div>

        {/* =====================================
            Contact Area
        ====================================== */}

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left */}
          <div>

            <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold">
              <Mail size={17} />
              Contact us
            </div>

            <h3 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Have a question?
            </h3>

            <p className="mt-4 text-slate-400 leading-7 max-w-lg">
              Whether you want to know more about Quick EMS or
              have feedback about the platform, we'd love to hear
              from you.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.04]">

                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Mail
                    size={19}
                    className="text-indigo-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    hello@quickems.com
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.04]">

                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare
                    size={19}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Support
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    We're here to help
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right - Form */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">

            {submitted ? (

              <div className="min-h-[380px] flex flex-col items-center justify-center text-center">

                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/10 flex items-center justify-center">
                  <CheckCircle2
                    size={32}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Message sent!
                </h3>

                <p className="mt-3 text-sm text-slate-400 max-w-sm">
                  Thanks for reaching out. We'll get back to
                  you as soon as possible.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Send another message
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-slate-600 outline-none focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10 transition"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-slate-600 outline-none focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10 transition"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-slate-600 outline-none resize-none focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10 transition"
                  />

                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-indigo-50 transition-all"
                >
                  Send Message

                  <Send
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

              </form>

            )}

          </div>

        </div>

        {/* =====================================
            Final Login CTA
        ====================================== */}

        <div className="mt-20 text-center">

          <p className="text-sm text-slate-500">
            Ready to manage your team smarter?
          </p>

          <button
            onClick={() =>
              window.location.href = "/login"
            }
            className="group mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-indigo-300 transition"
          >
            Get started with Quick EMS

            <ArrowRight
              size={19}
              className="group-hover:translate-x-1 transition-transform"
            />

          </button>

        </div>

      </div>
    </section>
  );
};

export default Contact;