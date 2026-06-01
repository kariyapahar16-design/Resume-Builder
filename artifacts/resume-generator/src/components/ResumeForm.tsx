import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResumeData } from "@/types/resume";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Briefcase, GraduationCap, Code2, FolderGit2,
  Award, Globe, Heart, Star, BookOpen, Users,
  FileText, User, ChevronRight, CheckCircle2,
  Mail, Phone, MapPin, Link2,
} from "lucide-react";

import PersonalInfoSection from "./sections/PersonalInfo";
import ProfessionalSummarySection from "./sections/ProfessionalSummary";
import WorkExperienceSection from "./sections/WorkExperience";
import EducationSection from "./sections/Education";
import SkillsSection from "./sections/Skills";
import ProjectsSection from "./sections/Projects";
import CertificationsSection from "./sections/Certifications";
import LanguagesSection from "./sections/Languages";
import VolunteerWorkSection from "./sections/VolunteerWork";
import AwardsSection from "./sections/Awards";
import PublicationsSection from "./sections/Publications";
import ReferencesSection from "./sections/References";

interface ResumeFormProps {
  data: ResumeData;
  updateData: (data: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
}

export default function ResumeForm({ data, updateData }: ResumeFormProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const pi = data.personalInfo;
  const filledFields = [pi.fullName, pi.email, pi.phone, pi.location, pi.profilePhoto].filter(Boolean).length;
  const totalFields = 5;
  const pct = Math.round((filledFields / totalFields) * 100);

  return (
    <>
      <ScrollArea className="h-full text-sidebar-foreground">
        <div className="pb-20">

          {/* ══════════════════════════════════════
              PERSONAL INFO — Sheet trigger card
          ══════════════════════════════════════ */}
          <div className="px-3 pt-4 pb-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              data-testid="button-open-personal-info"
              className="w-full rounded-xl border text-left transition-all duration-200 group hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, rgba(20,184,166,0.07) 0%, rgba(99,102,241,0.05) 100%)",
                borderColor: "rgba(20,184,166,0.3)",
                boxShadow: "0 0 20px rgba(20,184,166,0.06)",
              }}
            >
              <div className="flex items-center gap-3 p-4">
                {/* Avatar or icon */}
                <div className="relative shrink-0">
                  {pi.profilePhoto ? (
                    <img
                      src={pi.profilePhoto}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover border-2"
                      style={{ borderColor: "rgba(20,184,166,0.5)" }}
                    />
                  ) : (
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(99,102,241,0.15))",
                        border: "1px solid rgba(20,184,166,0.3)",
                      }}
                    >
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  {/* Online dot */}
                  <div
                    className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: filledFields >= 3 ? "#10b981" : "#6b7280",
                      borderColor: "#080e1a",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-white truncate">
                      {pi.fullName || "Personal Information"}
                    </span>
                  </div>
                  <div className="text-xs text-white/45 truncate">
                    {pi.jobTitle || "Click to fill in your details"}
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg, #14b8a6, #6366f1)",
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold shrink-0"
                      style={{ color: pct === 100 ? "#10b981" : "rgba(255,255,255,0.35)" }}>
                      {pct}%
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-4 w-4 text-primary/60 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Quick info pills */}
              {(pi.email || pi.phone || pi.location) && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {pi.email && (
                    <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-white/50 bg-white/5 border border-white/8">
                      <Mail className="h-2.5 w-2.5" />{pi.email}
                    </div>
                  )}
                  {pi.phone && (
                    <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-white/50 bg-white/5 border border-white/8">
                      <Phone className="h-2.5 w-2.5" />{pi.phone}
                    </div>
                  )}
                  {pi.location && (
                    <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-white/50 bg-white/5 border border-white/8">
                      <MapPin className="h-2.5 w-2.5" />{pi.location}
                    </div>
                  )}
                </div>
              )}
            </button>
          </div>

          {/* ── Divider ── */}
          <div className="px-3 pt-5 pb-3 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Resume Sections</span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* ══════════════════════════════════════
              RESUME SECTIONS — Accordion
          ══════════════════════════════════════ */}
          <div className="px-3 pb-4">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {[
                { value: "summary",        icon: <FileText className="h-4 w-4" />,      label: "Professional Summary", color: "#6366f1" },
                { value: "experience",     icon: <Briefcase className="h-4 w-4" />,     label: "Work Experience",       color: "#0ea5e9" },
                { value: "education",      icon: <GraduationCap className="h-4 w-4" />, label: "Education",             color: "#10b981" },
                { value: "skills",         icon: <Code2 className="h-4 w-4" />,         label: "Skills",                color: "#f59e0b" },
                { value: "projects",       icon: <FolderGit2 className="h-4 w-4" />,    label: "Projects",              color: "#8b5cf6" },
                { value: "certifications", icon: <Award className="h-4 w-4" />,         label: "Certifications",        color: "#14b8a6" },
                { value: "languages",      icon: <Globe className="h-4 w-4" />,         label: "Languages",             color: "#06b6d4" },
                { value: "volunteer",      icon: <Heart className="h-4 w-4" />,         label: "Volunteer Work",        color: "#ec4899" },
                { value: "awards",         icon: <Star className="h-4 w-4" />,          label: "Awards & Honors",       color: "#f97316" },
                { value: "publications",   icon: <BookOpen className="h-4 w-4" />,      label: "Publications",          color: "#a78bfa" },
                { value: "references",     icon: <Users className="h-4 w-4" />,         label: "References",            color: "#34d399" },
              ].map(({ value, icon, label, color }) => (
                <AccordionItem
                  key={value} value={value}
                  className="rounded-xl overflow-hidden border transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                >
                  <AccordionTrigger className="hover:no-underline py-3.5 px-3 group">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-data-[state=open]:scale-110"
                        style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
                      >
                        {icon}
                      </div>
                      <span className="font-semibold text-sm text-white/70 group-data-[state=open]:text-white transition-colors">
                        {label}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {value === "summary"        && <ProfessionalSummarySection data={data.summary} updateData={(v) => updateData({ summary: { ...data.summary, ...v } })} />}
                    {value === "experience"     && <WorkExperienceSection data={data.workExperience} updateData={(v) => updateData({ workExperience: v })} />}
                    {value === "education"      && <EducationSection data={data.education} updateData={(v) => updateData({ education: v })} />}
                    {value === "skills"         && <SkillsSection data={data.skills} updateData={(v) => updateData({ skills: v })} />}
                    {value === "projects"       && <ProjectsSection data={data.projects} updateData={(v) => updateData({ projects: v })} />}
                    {value === "certifications" && <CertificationsSection data={data.certifications} updateData={(v) => updateData({ certifications: v })} />}
                    {value === "languages"      && <LanguagesSection data={data.languages} updateData={(v) => updateData({ languages: v })} />}
                    {value === "volunteer"      && <VolunteerWorkSection data={data.volunteerWork} updateData={(v) => updateData({ volunteerWork: v })} />}
                    {value === "awards"         && <AwardsSection data={data.awards} updateData={(v) => updateData({ awards: v })} />}
                    {value === "publications"   && <PublicationsSection data={data.publications} updateData={(v) => updateData({ publications: v })} />}
                    {value === "references"     && <ReferencesSection data={data.references} updateData={(v) => updateData({ references: v })} />}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ScrollArea>

      {/* ══════════════════════════════════════
          PERSONAL INFO SHEET / DRAWER
      ══════════════════════════════════════ */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg p-0 border-l overflow-hidden flex flex-col"
          style={{
            background: "#05090f",
            borderColor: "rgba(20,184,166,0.2)",
          }}
        >
          {/* Gradient top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #14b8a6, #6366f1, #ec4899)" }}
          />

          {/* Sheet header */}
          <SheetHeader className="shrink-0 px-6 pt-7 pb-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(99,102,241,0.15))",
                  border: "1px solid rgba(20,184,166,0.3)",
                }}
              >
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-white font-bold text-lg tracking-tight">
                  Personal Information
                </SheetTitle>
                <p className="text-xs text-white/40 mt-0.5">Your name, photo, and contact details</p>
              </div>
            </div>

            {/* Completion bar */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: "linear-gradient(90deg, #14b8a6, #6366f1)" }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                {pct === 100 && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                <span className="text-xs font-bold" style={{ color: pct === 100 ? "#10b981" : "rgba(255,255,255,0.4)" }}>
                  {filledFields}/{totalFields} filled
                </span>
              </div>
            </div>
          </SheetHeader>

          {/* Scrollable form body */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <PersonalInfoSection
              data={data.personalInfo}
              updateData={(val) => updateData({ personalInfo: { ...data.personalInfo, ...val } })}
              inSheet
            />
          </div>

          {/* Footer */}
          <div
            className="shrink-0 px-6 py-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto-saved as you type
            </div>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
              data-testid="button-close-personal-info"
            >
              Done
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
