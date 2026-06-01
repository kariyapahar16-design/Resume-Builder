import { useState, useEffect } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { Button } from "@/components/ui/button";
import { Download, Trash2, FileText, Sparkles, Menu, X, Zap } from "lucide-react";
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
      <div className={`relative w-full overflow-hidden ${isFooter ? "rounded-2xl" : ""}`}
        style={{
          background: isWide
            ? "linear-gradient(135deg, #0a0f1e 0%, #080d18 50%, #0a1020 100%)"
            : isFooter
            ? "linear-gradient(135deg, #0d1325 0%, #0a1020 100%)"
            : "linear-gradient(135deg, #080d18 0%, #0a1020 100%)",
        }}
      >
        {/* Animated top gradient border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #14b8a6, #6366f1, #14b8a6, transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmerBorder 3s linear infinite",
          }}
        />

        {/* Background glow orbs */}
        <div className="absolute -top-10 left-1/4 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
        <div className="absolute -bottom-10 right-1/4 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

        <div className={`relative flex flex-col items-center justify-center ${isWide ? "py-6 px-4" : isFooter ? "py-5 px-4" : "py-4 px-4"} gap-3`}>

          {/* Sponsored label */}
          <div className="flex items-center gap-1.5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 select-none">Sponsored</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Ad content wrapper */}
          <div
            id={id}
            className="max-w-full w-full flex justify-center items-center"
            style={{ minHeight: isWide ? "90px" : "60px" }}
          />

          {/* Bottom badge */}
          <div className="flex items-center gap-1.5 mt-1">
            <Zap className="h-3 w-3 text-primary/60" />
            <span className="text-[9px] text-white/20 tracking-wider">Premium Partner</span>
          </div>
        </div>

        {/* Bottom gradient border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

function AdBanner() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="16744590e5745e39d8225c5c618d56fe"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl29601486.effectivecpmnetwork.com/16744590e5745e39d8225c5c618d56fe/invoke.js";
      document.head.appendChild(script);
    }
  }, []);

  return <AdSlot id="container-16744590e5745e39d8225c5c618d56fe" variant="banner" />;
}

export default function ResumeBuilder() {
  const { data, updateData, clearData } = useResumeData();
  const [isPrinting, setIsPrinting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── TOP NAVBAR ── */}
      <header className="no-print sticky top-0 z-50 w-full border-b border-white/8 bg-[#080d14]/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_18px_rgba(20,184,166,0.45)]">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-tight">ResumeStudio</span>
              <span className="text-primary text-[10px] font-medium tracking-wider uppercase">Free Builder</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#builder" className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">Builder</a>
            <a href="#features" className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">Features</a>
            <a href="#how-it-works" className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">How It Works</a>
            <a href="#tips" className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors">Tips</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors h-8 px-3">
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-popover border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear entire resume?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All your entered data will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Yes, clear data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              size="sm"
              onClick={handlePrint}
              className="h-8 bg-primary hover:bg-primary/90 text-white shadow-[0_0_12px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export PDF
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/8 bg-[#080d14] px-4 pb-4 pt-2"
          >
            <nav className="flex flex-col gap-1 mb-3">
              <a href="#builder" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Builder</a>
              <a href="#features" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#tips" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Tips</a>
            </nav>
            <div className="flex gap-2">
              <Button onClick={handlePrint} size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Export PDF
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* ── AD BANNER (top) ── */}
      <AdBanner />

      {/* ── HERO SECTION ── */}
      <section className="no-print bg-gradient-to-b from-[#080d14] to-background border-b border-white/5 py-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">100% Free — No Sign Up Required</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Build Your Professional Resume <br className="hidden sm:block" />
            <span className="text-primary">in Minutes</span>
          </h2>
          <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
            Fill in your details on the left, watch your resume come to life on the right, then export it as a polished PDF — ready to send to employers.
          </p>
        </motion.div>
      </section>

      {/* ── MAIN BUILDER ── */}
      <main id="builder" className="flex-1 flex overflow-hidden">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full md:w-[450px] lg:w-[500px] border-r border-border bg-sidebar flex flex-col z-10 shrink-0 ${isPrinting ? "no-print hidden" : ""}`}
          style={{ height: "calc(100vh - 64px - 60px - 144px)" }}
        >
          <div className="h-12 flex items-center justify-between px-4 border-b border-sidebar-border bg-sidebar/95 shrink-0">
            <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-widest">Resume Sections</span>
            <div className="flex items-center gap-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-sidebar-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-popover border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear entire resume?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All your entered data will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Yes, clear data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                size="sm"
                onClick={handlePrint}
                className="h-7 text-xs bg-primary hover:bg-primary/90 text-white"
              >
                <Download className="h-3 w-3 mr-1" />
                PDF
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <ResumeForm data={data} updateData={updateData} />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-sidebar to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Preview panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`flex-1 overflow-auto bg-[#0a0a0a] relative flex justify-center py-8 px-4 md:px-10 ${isPrinting ? "print-container !bg-white !py-0 !px-0" : ""}`}
          style={{ height: "calc(100vh - 64px - 60px - 144px)" }}
        >
          <div className={`w-full max-w-[850px] transition-transform origin-top ${isPrinting ? "max-w-none w-full !transform-none !shadow-none" : "shadow-2xl"}`}>
            <ResumePreview data={data} />
          </div>
        </motion.div>
      </main>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="no-print bg-[#080d14] border-t border-white/5 py-16 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Everything You Need to Land the Job</h3>
            <p className="text-white/50 text-sm">Packed with professional features — completely free</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "✦", title: "12 Resume Sections", desc: "Work experience, education, skills, projects, certifications, languages, awards, publications, and more." },
              { icon: "◈", title: "Live Preview", desc: "See your resume update in real-time as you type — no page reloads or manual refreshes needed." },
              { icon: "⬡", title: "PDF Export", desc: "Export a clean, print-ready PDF with one click. Formatted exactly as you see on screen." },
              { icon: "◇", title: "Auto-Save", desc: "Your data is automatically saved in your browser. Come back anytime and pick up where you left off." },
              { icon: "⬢", title: "No Sign Up", desc: "Jump straight in. No account, no email, no credit card — just build your resume." },
              { icon: "◉", title: "ATS Friendly", desc: "Clean structured layout that passes Applicant Tracking Systems used by top companies." },
            ].map((f) => (
              <div key={f.title} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-primary/30 hover:bg-white/5 transition-all group">
                <span className="text-primary text-xl mb-3 block">{f.icon}</span>
                <h4 className="text-white font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">{f.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD BANNER (mid) ── */}
      <AdSlot id="container-16744590e5745e39d8225c5c618d56fe-2" variant="wide" />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="no-print bg-background py-16 px-4 border-t border-white/5">
        <div className="max-w-screen-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-2">How It Works</h3>
          <p className="text-white/50 text-sm mb-10">Three steps to your perfect resume</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {[
              { step: "01", title: "Fill In Your Details", desc: "Complete each section of the form — add your experience, skills, education, and more." },
              { step: "02", title: "Preview in Real-Time", desc: "Watch the right panel update instantly as you type, formatted as a professional resume." },
              { step: "03", title: "Export as PDF", desc: "Hit 'Export PDF' to download a polished, print-ready resume to send to employers." },
            ].map((s) => (
              <div key={s.step} className="flex-1 flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">{s.step}</div>
                <h4 className="text-white font-semibold text-sm">{s.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIPS SECTION ── */}
      <section id="tips" className="no-print bg-[#080d14] border-t border-white/5 py-16 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Resume Writing Tips</h3>
            <p className="text-white/50 text-sm">Expert advice to make your resume stand out</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Use Action Verbs", tip: "Start every bullet point with a strong action verb: Led, Built, Increased, Designed, Optimized, Delivered." },
              { title: "Quantify Achievements", tip: "Numbers speak louder than words. 'Increased revenue by 32%' beats 'Improved sales performance'." },
              { title: "Tailor to Each Job", tip: "Mirror keywords from the job description. ATS systems score resumes against the posting." },
              { title: "Keep It to One Page", tip: "Unless you have 10+ years of experience, aim for a single page. Hiring managers skim in under 10 seconds." },
              { title: "Reverse Chronological Order", tip: "Always list your most recent experience first. Recruiters care most about what you did recently." },
              { title: "Proofread Twice", tip: "Spelling mistakes are instant disqualifiers. Read it aloud, then have someone else read it too." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3 bg-white/3 border border-white/8 rounded-lg p-4">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <h5 className="text-white text-sm font-semibold mb-1">{t.title}</h5>
                  <p className="text-white/50 text-xs leading-relaxed">{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="no-print bg-[#05080f] border-t border-white/5 py-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <FileText className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">ResumeStudio</div>
                <div className="text-white/40 text-xs">Free Professional Resume Builder</div>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#builder" className="text-white/40 hover:text-white text-xs transition-colors">Builder</a>
              <a href="#features" className="text-white/40 hover:text-white text-xs transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/40 hover:text-white text-xs transition-colors">How It Works</a>
              <a href="#tips" className="text-white/40 hover:text-white text-xs transition-colors">Tips</a>
            </nav>

            <div className="text-white/25 text-xs text-center sm:text-right">
              © {new Date().getFullYear()} ResumeStudio. All rights reserved.<br />
              <span className="text-white/15">Free to use. No data stored on servers.</span>
            </div>
          </div>

          {/* Bottom ad slot */}
          <div className="mt-8 px-0">
            <AdSlot id="container-16744590e5745e39d8225c5c618d56fe-3" variant="footer" />
          </div>
        </div>
      </footer>

    </div>
  );
}
