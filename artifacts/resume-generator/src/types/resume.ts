import { z } from "zod";

export const PersonalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedInUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  profilePhoto: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const ProfessionalSummarySchema = z.object({
  summary: z.string().optional(),
});

export const WorkExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
  achievements: z.string().optional(),
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  category: z.string().optional(),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
});

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language is required"),
  proficiency: z.enum(["Native", "Fluent", "Professional", "Basic"]).optional(),
});

export const VolunteerWorkSchema = z.object({
  id: z.string(),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  dates: z.string().optional(),
  description: z.string().optional(),
});

export const AwardSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Award name is required"),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  publisher: z.string().optional(),
  date: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  title: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  availableOnRequest: z.boolean().default(false),
});

export const ResumeDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  summary: ProfessionalSummarySchema,
  workExperience: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
  certifications: z.array(CertificationSchema),
  languages: z.array(LanguageSchema),
  volunteerWork: z.array(VolunteerWorkSchema),
  awards: z.array(AwardSchema),
  publications: z.array(PublicationSchema),
  references: z.array(ReferenceSchema),
  
  // Settings
  layout: z.object({
    skillColumns: z.number().default(2),
  }).default({ skillColumns: 2 })
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type ProfessionalSummary = z.infer<typeof ProfessionalSummarySchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type VolunteerWork = z.infer<typeof VolunteerWorkSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    websiteUrl: "",
    linkedInUrl: "",
    githubUrl: "",
    profilePhoto: "",
  },
  summary: {
    summary: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  volunteerWork: [],
  awards: [],
  publications: [],
  references: [],
  layout: {
    skillColumns: 2,
  }
};
