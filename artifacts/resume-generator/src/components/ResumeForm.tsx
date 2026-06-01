import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResumeData } from "@/types/resume";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
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
  FileText
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
  return (
    <ScrollArea className="h-full px-4 py-6 text-sidebar-foreground">
      <div className="space-y-6 pb-20">
        <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="personal-info">
          
          <AccordionItem value="personal-info" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Personal Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <PersonalInfoSection data={data.personalInfo} updateData={(val) => updateData({ personalInfo: { ...data.personalInfo, ...val } })} />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="summary" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Professional Summary</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <ProfessionalSummarySection data={data.summary} updateData={(val) => updateData({ summary: { ...data.summary, ...val } })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Work Experience</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <WorkExperienceSection data={data.workExperience} updateData={(val) => updateData({ workExperience: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Education</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <EducationSection data={data.education} updateData={(val) => updateData({ education: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Code2 className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Skills</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <SkillsSection data={data.skills} updateData={(val) => updateData({ skills: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <FolderGit2 className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Projects</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <ProjectsSection data={data.projects} updateData={(val) => updateData({ projects: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="certifications" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Award className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Certifications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <CertificationsSection data={data.certifications} updateData={(val) => updateData({ certifications: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="languages" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Languages</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <LanguagesSection data={data.languages} updateData={(val) => updateData({ languages: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="volunteer" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Volunteer Work</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <VolunteerWorkSection data={data.volunteerWork} updateData={(val) => updateData({ volunteerWork: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="awards" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Star className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Awards & Honors</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <AwardsSection data={data.awards} updateData={(val) => updateData({ awards: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="publications" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">Publications</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <PublicationsSection data={data.publications} updateData={(val) => updateData({ publications: val })} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="references" className="border-sidebar-border bg-sidebar-accent/30 rounded-lg px-2 shadow-sm overflow-hidden data-[state=open]:bg-sidebar-accent/50 transition-colors">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm tracking-wide">References</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <ReferencesSection data={data.references} updateData={(val) => updateData({ references: val })} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </ScrollArea>
  );
}
