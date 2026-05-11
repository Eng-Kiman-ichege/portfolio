"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

/* ── Types ── */
type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ── Helpers ── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.subject.trim() || data.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

/* ── Animation variants ── */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Contact info ── */
const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "kimf95023@gmail.com",
    href: "mailto:kimf95023@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 793 511 825",
    href: "tel:+254793511825",
    color: "#a855f7",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: "#",
    color: "#06b6d4",
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
];

/* ── Field component ── */
function Field({
  label, name, type = "text", as, value, error, onChange, placeholder,
}: {
  label: string; name: keyof FormData; type?: string; as?: "textarea";
  value: string; error?: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder: string;
}) {
  const Tag = as ?? "input";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={as === "textarea" ? 5 : undefined}
        className={`contact-input ${error ? "border-red-500/40 focus:border-red-500" : ""} ${as === "textarea" ? "resize-none" : ""}`}
      />
      {error && (
        <span className="flex items-center gap-1 text-xs text-red-400 mt-0.5">
          <AlertCircle className="h-3 w-3 flex-shrink-0" /> {error}
        </span>
      )}
    </div>
  );
}

/* ── Main export ── */
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");

    // Simulate sending (replace with real API / EmailJS / Resend)
    await new Promise((r) => setTimeout(r, 1800));
    // Open mailto as fallback
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`Hi Evan,\n\n${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:kimf95023@gmail.com?subject=${subject}&body=${body}`;

    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-36 overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          custom={0} variants={reveal} initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[11px] tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Let&apos;s Build{" "}
            <span style={{ background: "linear-gradient(135deg,#3b82f6,#a855f7,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Something Great
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have a project in mind? I&apos;m currently open to freelance opportunities
            and full-time roles. Let&apos;s connect.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 max-w-6xl mx-auto">

          {/* ── Left info panel ── */}
          <motion.div
            custom={1} variants={reveal} initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact items */}
            <div className="contact-glass rounded-3xl p-7 flex flex-col gap-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Contact Info</h3>
              {CONTACT_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="group flex items-center gap-4 transition-all">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold group-hover:text-accent transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="contact-glass rounded-3xl p-7">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-5">Find Me Online</h3>
              <div className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label} href={s.href}
                    className="flex items-center gap-3 group text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/3 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="contact-glass rounded-3xl p-6 flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold">Currently Available</p>
                <p className="text-xs text-muted-foreground">Open to projects &amp; full-time roles</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right form panel ── */}
          <motion.div
            custom={2} variants={reveal} initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <div className="contact-glass rounded-3xl p-7 sm:p-9">
              <h3 className="text-lg font-bold mb-6">Send a Message</h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold">Message Sent!</h4>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" placeholder="John Doe" value={form.name} error={errors.name} onChange={handleChange} />
                    <Field label="Email Address" name="email" type="email" placeholder="john@example.com" value={form.email} error={errors.email} onChange={handleChange} />
                  </div>
                  <Field label="Subject" name="subject" placeholder="Project inquiry, collaboration..." value={form.subject} error={errors.subject} onChange={handleChange} />
                  <Field label="Message" name="message" as="textarea" placeholder="Tell me about your project, goals, or anything you'd like to discuss..." value={form.message} error={errors.message} onChange={handleChange} />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="contact-submit-btn group mt-1"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
