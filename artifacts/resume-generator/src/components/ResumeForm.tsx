import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResumeData } from "@/types/resume";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Globe,
  Heart,
  Star,
  BookOpen,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  User,
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
  const [profileExpanded, setProfileExpanded] = useState(true);

  return (
    <ScrollArea className="h-full text-sidebar-foreground">
      <div className="pb-20">

        {/* ══════════════════════════════════════
            PERSONAL INFO — Dedicated Section
        ══════════════════════════════════════ */}
        <div className="px-3 pt-4 pb-2">
          {/* Section header card */}
          <div
            className="rounded-xl overflow-hidden border"
            style={{
              background: "linear-gradient(135deg, rgba(20,184,166,0.06) 0%, rgba(99,102,241,0.04) 100%)",
              borderColor: "rgba(20,184,166,0.25)",
            }}
          >
            {/* Header bar */}
            <button
              type="button"
              onClick={() => setProfileExpanded((p) => !p)}
              className="w-full flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-white/[0.03]"
              data-testid="button-toggle-personal-info"
            >
              <div className="flex items-center gap-3">
                {/* Gradient icon */}
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(20,184,166,0.25), rgba(99,102,241,0.2))",
                    border: "1px solid rgba(20,184,166,0.3)",
                  }}
                >
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white tracking-tight">Personal Information</div>
                  <div className="text-[10px] text-white/40 font-medium mt-0.5">
                    {data.personalInfo.fullName
                      ? `${data.personalInfo.fullName}${data.personalInfo.jobTitle ? ` · ${data.personalInfo.jobTitle}` : ""}`
                      : "Name, contact details, photo"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Completion dots */}
                <div className="hidden sm:flex items-center gap-1">
                  {[
                    !!data.personalInfo.fullName,
                    !!data.personalInfo.email,
                    !!data.personalInfo.phone,
                    !!data.personalInfo.profilePhoto,
                  ].map((filled, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full transition-colors"
                      style={{ background: filled ? "rgba(20,184,166,0.9)" : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
                <div className="text-white/30">
                  {profileExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
            </button>

            {/* Animated content */}
            {profileExpanded && (
              <div
                className="px-4 pb-5 pt-1"
                style={{ borderTop: "1px solid rgba(20,184,166,0.12)" }}
              >
                <PersonalInfoSection
                  data={data.personalInfo}
                  updateData={(val) => updateData({ personalInfo: { ...data.personalInfo, ...val } })}
                />
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            DIVIDER — Resume Sections
        ══════════════════════════════════════ */}
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
              { value: "summary",        icon: <FileText className="h-4 w-4" />,       label: "Professional Summary",  color: "#6366f1" },
              { value: "experience",     icon: <Briefcase className="h-4 w-4" />,      label: "Work Experience",        color: "#0ea5e9" },
              { value: "education",      icon: <GraduationCap className="h-4 w-4" />,  label: "Education",              color: "#10b981" },
              { value: "skills",         icon: <Code2 className="h-4 w-4" />,          label: "Skills",                 color: "#f59e0b" },
              { value: "projects",       icon: <FolderGit2 className="h-4 w-4" />,     label: "Projects",               color: "#8b5cf6" },
              { value: "certifications", icon: <Award className="h-4 w-4" />,          label: "Certifications",         color: "#14b8a6" },
              { value: "languages",      icon: <Globe className="h-4 w-4" />,          label: "Languages",              color: "#06b6d4" },
              { value: "volunteer",      icon: <Heart className="h-4 w-4" />,          label: "Volunteer Work",         color: "#ec4899" },
              { value: "awards",         icon: <Star className="h-4 w-4" />,           label: "Awards & Honors",        color: "#f97316" },
              { value: "publications",   icon: <BookOpen className="h-4 w-4" />,       label: "Publications",           color: "#a78bfa" },
              { value: "references",     icon: <Users className="h-4 w-4" />,          label: "References",             color: "#34d399" },
            ].map(({ value, icon, label, color }) => (
              <AccordionItem
                key={value}
                value={value}
                className="rounded-xl overflow-hidden border transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <AccordionTrigger
                  className="hover:no-underline py-3.5 px-3 group"
                  style={{ "--accordion-trigger-color": color } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-data-[state=open]:scale-110"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
                    >
                      {icon}
                    </div>
                    <span className="font-semibold text-sm text-white/75 group-data-[state=open]:text-white transition-colors">
                      {label}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  className="px-3 pb-4 pt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {value === "summary" && (
                    <ProfessionalSummarySection data={data.summary} updateData={(val) => updateData({ summary: { ...data.summary, ...val } })} />
                  )}
                  {value === "experience" && (
                    <WorkExperienceSection data={data.workExperience} updateData={(val) => updateData({ workExperience: val })} />
                  )}
                  {value === "education" && (
                    <EducationSection data={data.education} updateData={(val) => updateData({ education: val })} />
                  )}
                  {value === "skills" && (
                    <SkillsSection data={data.skills} updateData={(val) => updateData({ skills: val })} />
                  )}
                  {value === "projects" && (
                    <ProjectsSection data={data.projects} updateData={(val) => updateData({ projects: val })} />
                  )}
                  {value === "certifications" && (
                    <CertificationsSection data={data.certifications} updateData={(val) => updateData({ certifications: val })} />
                  )}
                  {value === "languages" && (
                    <LanguagesSection data={data.languages} updateData={(val) => updateData({ languages: val })} />
                  )}
                  {value === "volunteer" && (
                    <VolunteerWorkSection data={data.volunteerWork} updateData={(val) => updateData({ volunteerWork: val })} />
                  )}
                  {value === "awards" && (
                    <AwardsSection data={data.awards} updateData={(val) => updateData({ awards: val })} />
                  )}
                  {value === "publications" && (
                    <PublicationsSection data={data.publications} updateData={(val) => updateData({ publications: val })} />
                  )}
                  {value === "references" && (
                    <ReferencesSection data={data.references} updateData={(val) => updateData({ references: val })} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}

          </Accordion>
        </div>
      </div>
    </ScrollArea>
  );
}
