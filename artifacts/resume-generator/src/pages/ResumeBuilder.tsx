import { useState, useEffect } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { Button } from "@/components/ui/button";
import {
  Download, Trash2, FileText, Sparkles, Menu, X, Zap,
  CheckCircle2, Users, Star, Shield, Clock, Layers,
  ArrowRight, ChevronRight, Target, Lightbulb, TrendingUp,
  BookOpen, AlignLeft, Award
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   AD SLOT — premium framing around ad content
───────────────────────────────────────────── */
function AdSlot({ id, variant = "banner" }: { id: string; variant?: "banner" | "wide" | "footer" }) {
  const isWide = variant === "wide";
  const isFooter = variant === "footer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="no-print w-full"
    >
      <div
        className={`relative w-full overflow-hidden ${isFooter ? "rounded-2xl" : ""}`}
        style={{ background: "linear-gradient(135deg, #08111f 0%, #060c18 50%, #09111f 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #14b8a6, #6366f1, #ec4899, #14b8a6, transparent)", backgroundSize: "300% 100%", animation: "shimmerBorder 4s linear infinite" }} />
        <div className="absolute -top-12 left-1/3 w-56 h-56 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
        <div className="absolute -bottom-12 right-1/3 w-56 h-56 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

        <div className={`relative flex flex-col items-center justify-center ${isWide ? "py-7 px-4" : isFooter ? "py-6 px-4" : "py-4 px-4"} gap-3`}>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 w-12 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35 select-none">Sponsored</span>
            </div>
            <div className="h-px flex-1 w-12 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
          </div>

          <div id={id} className="max-w-full w-full flex justify-center items-center" style={{ minHeight: isWide ? "90px" : "60px" }} />

          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-primary/50" />
            <span className="text-[9px] text-white/20 tracking-wider uppercase font-medium">Premium Partner</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
      </div>
    </motion.div>
  );
}

function AdBanner() {
  useEffect(() => {
    if (!document.querySelector('script[src*="16744590e5745e39d8225c5c618d56fe"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.setAttribute("data-cfasync", "false");
      s.src = "https://pl29601486.effectivecpmnetwork.com/16744590e5745e39d8225c5c618d56fe/invoke.js";
      document.head.appendChild(s);
    }
  }, []);
  return <AdSlot id="container-16744590e5745e39d8225c5c618d56fe" variant="banner" />;
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ResumeBuilder() {
  const { data, updateData, clearData } = useResumeData();
  const [isPrinting, setIsPrinting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => { window.print(); setIsPrinting(false); }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#05090f]">

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className="no-print sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#05090f]/90 backdrop-blur-xl">
        {/* Navbar top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent 0%, #14b8a6 30%, #6366f1 70%, transparent 100%)" }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)", boxShadow: "0 0 20px rgba(20,184,166,0.4)" }}>
              <FileText className="h-4.5 w-4.5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#05090f]" />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-white font-bold text-[15px] tracking-tight">ResumeStudio</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase"
                style={{ background: "linear-gradient(90deg, #14b8a6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Pro Builder
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {["Builder", "Features", "How It Works", "Tips"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 text-sm text-white/55 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 font-medium">
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white/40 hover:text-red-400 hover:bg-red-400/10 h-9 px-3 rounded-lg">
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-popover border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear entire resume?</AlertDialogTitle>
                  <AlertDialogDescription>This cannot be undone. All your entered data will be permanently deleted.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Yes, clear</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button size="sm" onClick={handlePrint}
              className="h-9 px-5 font-semibold text-white rounded-xl transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #14b8a6, #0ea5e9)", boxShadow: "0 0 18px rgba(20,184,166,0.35)" }}>
              <Download className="h-3.5 w-3.5 mr-1.5" />Export PDF
            </Button>
          </div>

          <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#05090f] px-4 pb-4 pt-3 space-y-1">
            {["Builder", "Features", "How It Works", "Tips"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5">
                {item}
              </a>
            ))}
            <Button onClick={handlePrint} size="sm" className="w-full mt-2 text-white"
              style={{ background: "linear-gradient(135deg, #14b8a6, #0ea5e9)" }}>
              <Download className="h-3.5 w-3.5 mr-1.5" />Export PDF
            </Button>
          </motion.div>
        )}
      </header>

      {/* ══════════════════════════════════════
          TOP AD SLOT
      ══════════════════════════════════════ */}
      <AdBanner />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="no-print relative overflow-hidden py-20 px-4 text-center"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(20,184,166,0.12) 0%, rgba(99,102,241,0.08) 40%, transparent 70%), #05090f" }}>

        {/* Animated background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none animate-pulse"
          style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #0ea5e9, transparent)" }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border"
            style={{ background: "rgba(20,184,166,0.08)", borderColor: "rgba(20,184,166,0.2)" }}>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">100% Free — No Account Needed</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            Create a{" "}
            <span style={{ background: "linear-gradient(135deg, #14b8a6 0%, #6366f1 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Stunning Resume
            </span>
            <br />That Gets You Hired
          </h1>

          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Fill in your details, watch your resume come to life in real-time, and export a polished PDF in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="#builder">
              <Button size="lg" className="h-12 px-8 text-base font-bold text-white rounded-xl shadow-2xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)", boxShadow: "0 0 40px rgba(20,184,166,0.3)" }}>
                <Sparkles className="h-4 w-4 mr-2" />Build My Resume Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="ghost" className="h-12 px-8 text-base font-semibold text-white/70 rounded-xl border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { value: "50K+", label: "Resumes Built", icon: <FileText className="h-3.5 w-3.5" /> },
              { value: "4.9★", label: "User Rating", icon: <Star className="h-3.5 w-3.5" /> },
              { value: "12", label: "Resume Sections", icon: <Layers className="h-3.5 w-3.5" /> },
              { value: "100%", label: "Free Forever", icon: <Shield className="h-3.5 w-3.5" /> },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xl">{s.value}</div>
                <div className="flex items-center gap-1 text-white/40 text-xs">{s.icon}{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════ */}
      <div className="no-print border-y border-white/[0.05] py-4 px-4 overflow-hidden"
        style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(99,102,241,0.04))" }}>
        <div className="max-w-screen-lg mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {[
            { icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />, text: "No watermarks on PDF" },
            { icon: <Shield className="h-3.5 w-3.5 text-blue-400" />, text: "Data never leaves your browser" },
            { icon: <Clock className="h-3.5 w-3.5 text-purple-400" />, text: "Auto-saves as you type" },
            { icon: <Target className="h-3.5 w-3.5 text-teal-400" />, text: "ATS-optimized format" },
            { icon: <Users className="h-3.5 w-3.5 text-pink-400" />, text: "Trusted by 50,000+ job seekers" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2">
              {t.icon}
              <span className="text-white/50 text-xs font-medium">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          BUILDER
      ══════════════════════════════════════ */}
      <main id="builder" className="flex-1 flex overflow-hidden border-b border-white/[0.05]">
        {/* Form panel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          className={`w-full md:w-[440px] lg:w-[490px] flex flex-col shrink-0 ${isPrinting ? "no-print hidden" : ""}`}
          style={{ height: "calc(100vh - 64px - 60px)", background: "linear-gradient(180deg, #080e1a 0%, #06101c 100%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Panel header */}
          <div className="h-12 flex items-center justify-between px-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(20,184,166,0.03)" }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-[0.15em]">Resume Sections</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/25 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-popover border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear entire resume?</AlertDialogTitle>
                    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearData} className="bg-destructive">Yes, clear</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button size="sm" onClick={handlePrint} className="h-7 text-xs font-semibold text-white rounded-lg px-3"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}>
                <Download className="h-3 w-3 mr-1" />PDF
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <ResumeForm data={data} updateData={updateData} />
            <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
              style={{ background: "linear-gradient(to top, #06101c, transparent)" }} />
          </div>
        </motion.div>

        {/* Preview panel */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className={`flex-1 overflow-auto relative flex justify-center py-8 px-4 md:px-8 ${isPrinting ? "print-container !bg-white !py-0 !px-0" : ""}`}
          style={{ height: "calc(100vh - 64px - 60px)", background: "radial-gradient(ellipse at center, #0c1520 0%, #080d14 100%)" }}>

          {/* Grid overlay */}
          {!isPrinting && (
            <div className="absolute inset-0 pointer-events-none opacity-30"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          )}

          <div className={`relative w-full max-w-[820px] ${isPrinting ? "max-w-none w-full !transform-none !shadow-none" : ""}`}>
            {/* Glow behind resume */}
            {!isPrinting && (
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.3), transparent 70%)" }} />
            )}
            <div className={`relative ${isPrinting ? "" : "shadow-[0_30px_80px_rgba(0,0,0,0.6)]"}`}>
              <ResumePreview data={data} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* ══════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════ */}
      <section id="features" className="no-print py-20 px-4"
        style={{ background: "linear-gradient(180deg, #06090f 0%, #080e1a 100%)" }}>
        <div className="max-w-screen-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 border border-white/10 bg-white/[0.04]">
              <Sparkles className="h-3 w-3 text-teal-400" />
              <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">Why ResumeStudio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Everything You Need to{" "}
              <span style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Land the Job
              </span>
            </h2>
            <p className="text-white/45 text-base max-w-lg mx-auto">Packed with professional features — 100% free, no tricks</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Layers className="h-5 w-5" />, color: "#14b8a6", bg: "rgba(20,184,166,0.1)", title: "12 Resume Sections", desc: "Work experience, education, skills, projects, certifications, languages, awards, publications, and more." },
              { icon: <Zap className="h-5 w-5" />, color: "#6366f1", bg: "rgba(99,102,241,0.1)", title: "Live Preview", desc: "See your resume update in real-time as you type — zero reloads, zero friction." },
              { icon: <Download className="h-5 w-5" />, color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", title: "PDF Export", desc: "One-click PDF export. Clean, formatted, print-ready. Exactly what you see on screen." },
              { icon: <Clock className="h-5 w-5" />, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", title: "Auto-Save", desc: "Your data is saved in your browser automatically. Return any time — nothing is lost." },
              { icon: <Shield className="h-5 w-5" />, color: "#10b981", bg: "rgba(16,185,129,0.1)", title: "100% Free & Private", desc: "No account, no email, no credit card. Your data never leaves your device." },
              { icon: <Target className="h-5 w-5" />, color: "#ec4899", bg: "rgba(236,72,153,0.1)", title: "ATS Friendly", desc: "Clean structured layout that passes Applicant Tracking Systems at top companies." },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = f.color + "50"; e.currentTarget.style.background = f.bg; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: f.bg, color: f.color, border: `1px solid ${f.color}25` }}>
                  {f.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{f.title}</h4>
                <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MID AD SLOT */}
      <AdSlot id="container-16744590e5745e39d8225c5c618d56fe-2" variant="wide" />

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="no-print py-20 px-4"
        style={{ background: "linear-gradient(180deg, #05090f 0%, #08111c 100%)" }}>
        <div className="max-w-screen-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 border border-white/10 bg-white/[0.04]">
              <ChevronRight className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Ready in{" "}
              <span style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                3 Simple Steps
              </span>
            </h2>
            <p className="text-white/45 text-base">No learning curve. Just fill, preview, download.</p>
          </motion.div>

          <div className="relative flex flex-col sm:flex-row gap-0 sm:gap-0">
            {/* Connecting line (desktop) */}
            <div className="hidden sm:block absolute top-8 left-[calc(16.6%-16px)] right-[calc(16.6%-16px)] h-[2px]"
              style={{ background: "linear-gradient(90deg, #14b8a6, #6366f1, #ec4899)" }} />

            {[
              { step: "01", title: "Fill In Your Details", desc: "Complete each resume section — add your experience, skills, education, and achievements.", icon: <AlignLeft className="h-5 w-5" />, color: "#14b8a6" },
              { step: "02", title: "Watch It Come Alive", desc: "See your formatted resume update in real-time on the right panel as you type.", icon: <Zap className="h-5 w-5" />, color: "#6366f1" },
              { step: "03", title: "Export & Apply", desc: "Hit 'Export PDF' for a polished, print-ready resume to send straight to employers.", icon: <Download className="h-5 w-5" />, color: "#ec4899" },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 flex flex-col items-center text-center px-6 py-8 relative">
                {/* Step number bubble */}
                <div className="relative h-16 w-16 rounded-2xl flex items-center justify-center mb-5 z-10"
                  style={{ background: `linear-gradient(135deg, ${s.color}20, ${s.color}10)`, border: `2px solid ${s.color}40`, color: s.color, boxShadow: `0 0 30px ${s.color}25` }}>
                  {s.icon}
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                    style={{ background: s.color }}>
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-white font-bold text-base mb-2">{s.title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.5 }} className="text-center mt-10">
            <a href="#builder">
              <Button size="lg" className="h-12 px-8 font-bold text-white rounded-xl"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)", boxShadow: "0 0 30px rgba(20,184,166,0.25)" }}>
                <Sparkles className="h-4 w-4 mr-2" />Start Building Now — Free
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIPS SECTION
      ══════════════════════════════════════ */}
      <section id="tips" className="no-print py-20 px-4"
        style={{ background: "linear-gradient(180deg, #080e1a 0%, #06090f 100%)" }}>
        <div className="max-w-screen-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 border border-white/10 bg-white/[0.04]">
              <Lightbulb className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">Expert Advice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Resume Tips That{" "}
              <span style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Get You Noticed
              </span>
            </h2>
            <p className="text-white/45 text-base">Proven strategies used by job seekers who landed interviews at top companies</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { num: "01", icon: <TrendingUp className="h-4 w-4" />, color: "#14b8a6", title: "Use Action Verbs", tip: "Start every bullet with a strong verb: Led, Built, Increased, Designed, Optimized, Delivered." },
              { num: "02", icon: <Target className="h-4 w-4" />, color: "#6366f1", title: "Quantify Achievements", tip: "'Increased revenue by 32%' beats 'Improved sales'. Numbers prove impact instantly." },
              { num: "03", icon: <BookOpen className="h-4 w-4" />, color: "#0ea5e9", title: "Tailor to Each Job", tip: "Mirror keywords from the job description. ATS systems score your resume against the posting." },
              { num: "04", icon: <AlignLeft className="h-4 w-4" />, color: "#f59e0b", title: "Keep It to One Page", tip: "Unless 10+ years of experience, aim for a single page. Recruiters skim in under 10 seconds." },
              { num: "05", icon: <Clock className="h-4 w-4" />, color: "#10b981", title: "Reverse Chronological", tip: "Always list your most recent experience first. Recruiters care most about what you did recently." },
              { num: "06", icon: <Award className="h-4 w-4" />, color: "#ec4899", title: "Proofread Twice", tip: "Spelling mistakes are instant disqualifiers. Read aloud, then have someone else review it." },
            ].map((t, i) => (
              <motion.div key={t.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex gap-4 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + "40"; e.currentTarget.style.background = `${t.color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}>
                  {t.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: t.color }}>#{t.num}</span>
                    <h5 className="text-white font-bold text-sm">{t.title}</h5>
                  </div>
                  <p className="text-white/45 text-xs leading-relaxed">{t.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRE-FOOTER CTA BANNER
      ══════════════════════════════════════ */}
      <section className="no-print py-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(99,102,241,0.08) 50%, rgba(236,72,153,0.06) 100%), #05090f" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Your dream job is{" "}
              <span style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                one resume away
              </span>
            </h2>
            <p className="text-white/50 mb-8 text-base">Join 50,000+ professionals who built their resume with ResumeStudio — for free.</p>
            <a href="#builder">
              <Button size="lg" className="h-12 px-10 font-bold text-white rounded-xl hover:scale-[1.02] transition-transform"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1, #ec4899)", boxShadow: "0 0 40px rgba(20,184,166,0.25)" }}>
                <Sparkles className="h-4 w-4 mr-2" />Build My Resume — It's Free
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="no-print px-4 pt-12 pb-8"
        style={{ background: "#030609", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}>
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-base">ResumeStudio</div>
                  <div className="text-white/35 text-xs">Free Professional Resume Builder</div>
                </div>
              </div>
              <p className="text-white/30 text-xs max-w-xs leading-relaxed">
                Build beautiful, ATS-friendly resumes in minutes. Free forever. No sign up required.
              </p>
            </div>

            {/* Nav */}
            <nav className="grid grid-cols-2 gap-x-12 gap-y-2">
              {["Builder", "Features", "How It Works", "Tips"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white/35 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer ad slot */}
          <div className="mb-8">
            <AdSlot id="container-16744590e5745e39d8225c5c618d56fe-3" variant="footer" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2 text-white/20 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
            <div className="text-white/20 text-xs text-center">
              © {new Date().getFullYear()} ResumeStudio · Free to use · No data stored on servers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
