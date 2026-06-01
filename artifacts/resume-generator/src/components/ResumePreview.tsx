import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    projects, 
    certifications, 
    languages, 
    volunteerWork, 
    awards, 
    publications, 
    references 
  } = data;
  
  // Group skills by category for better display
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="bg-white min-h-[1056px] w-full p-8 md:p-12 text-black font-serif print:p-0 shadow-lg shadow-black/10 mx-auto print:shadow-none">
      
      {/* Header */}
      <header className="mb-6 border-b-2 border-black/80 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-gray-900 font-sans uppercase">
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.jobTitle && (
          <h2 className="text-lg md:text-xl text-primary font-medium tracking-wide mb-3 font-sans">
            {personalInfo.jobTitle}
          </h2>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-700 font-sans mt-3">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <MailIcon className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <PhoneIcon className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.websiteUrl && (
            <span className="flex items-center gap-1">
              <LinkIcon className="w-3 h-3" />
              {personalInfo.websiteUrl.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedInUrl && (
            <span className="flex items-center gap-1">
              <LinkedinIcon className="w-3 h-3" />
              {personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </span>
          )}
          {personalInfo.githubUrl && (
            <span className="flex items-center gap-1">
              <GithubIcon className="w-3 h-3" />
              {personalInfo.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary.summary && (
        <section className="mb-6">
          <SectionTitle title="Professional Summary" />
          <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
            {summary.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Experience" />
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 font-sans">{exp.jobTitle}</h4>
                  <span className="text-sm font-sans text-gray-600 font-medium whitespace-nowrap">
                    {exp.startDate} {exp.startDate || exp.endDate ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h5 className="italic text-gray-800 text-sm font-serif">{exp.company}</h5>
                  {exp.location && (
                    <span className="text-xs text-gray-500 font-sans">{exp.location}</span>
                  )}
                </div>
                {exp.bullets && exp.bullets.length > 0 && exp.bullets[0] !== "" && (
                  <ul className="list-disc ml-5 space-y-1 mt-1 text-[13px] text-gray-700 font-sans">
                    {exp.bullets.map((bullet, idx) => (
                      bullet ? <li key={idx} className="pl-1 leading-snug">{bullet}</li> : null
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Education" />
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 font-sans">{edu.institution}</h4>
                  <span className="text-sm font-sans text-gray-600 font-medium">
                    {edu.graduationYear}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <h5 className="italic text-gray-800 text-sm font-serif">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h5>
                  {edu.gpa && (
                    <span className="text-xs text-gray-600 font-sans">GPA: {edu.gpa}</span>
                  )}
                </div>
                {edu.achievements && (
                  <p className="mt-1 text-[13px] text-gray-700 font-sans">
                    <span className="font-semibold">Honors: </span>
                    {edu.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Skills" />
          <div className={`grid gap-x-8 gap-y-2 font-sans text-[13px] text-gray-800 ${data.layout.skillColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <div key={category} className="mb-1">
                <span className="font-bold text-gray-900">{category}: </span>
                <span>{catSkills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Projects" />
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 font-sans">{proj.name}</h4>
                    {proj.liveUrl && (
                      <span className="text-[10px] text-primary/80 font-sans px-1 border border-primary/20 rounded">Live</span>
                    )}
                    {proj.githubUrl && (
                      <span className="text-[10px] text-gray-500 font-sans px-1 border border-gray-200 rounded">Source</span>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="mt-1 text-[13px] text-gray-700 font-sans leading-snug">
                    {proj.description}
                  </p>
                )}
                {proj.techStack && proj.techStack.length > 0 && proj.techStack[0] !== "" && (
                  <p className="mt-1.5 text-[12px] text-gray-600 font-sans italic">
                    Built with: {proj.techStack.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Certifications" />
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className="flex justify-between items-baseline font-sans text-[13px]">
                <div>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-700">, {cert.issuer}</span>}
                  {cert.credentialId && <span className="text-gray-500 text-xs ml-2">ID: {cert.credentialId}</span>}
                </div>
                <div className="text-gray-600 text-xs whitespace-nowrap ml-4">
                  {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards & Honors */}
      {awards.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Awards & Honors" />
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={award.id || index} className="font-sans text-[13px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{award.name}</span>
                  <span className="text-gray-600 text-xs whitespace-nowrap ml-4">{award.date}</span>
                </div>
                {award.issuer && <div className="italic text-gray-700">{award.issuer}</div>}
                {award.description && <div className="text-gray-600 mt-0.5">{award.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Publications" />
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={pub.id || index} className="font-sans text-[13px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{pub.title}</span>
                  <span className="text-gray-600 text-xs whitespace-nowrap ml-4">{pub.date}</span>
                </div>
                {pub.publisher && <div className="italic text-gray-700">{pub.publisher}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer Work */}
      {volunteerWork.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="Volunteer Work" />
          <div className="space-y-4">
            {volunteerWork.map((vol, index) => (
              <div key={vol.id || index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 font-sans">{vol.role}</h4>
                  <span className="text-sm font-sans text-gray-600 font-medium whitespace-nowrap">
                    {vol.dates}
                  </span>
                </div>
                <div className="italic text-gray-800 text-sm font-serif mb-1">{vol.organization}</div>
                {vol.description && (
                  <p className="mt-1 text-[13px] text-gray-700 font-sans leading-snug">
                    {vol.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <SectionTitle title="Languages" />
            <div className="grid grid-cols-1 gap-2 font-sans text-[13px] text-gray-800">
              {languages.map((lang, index) => (
                <div key={lang.id || index} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="font-bold text-gray-900">{lang.name}</span>
                  <span className="text-gray-600 italic">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="mb-6">
            <SectionTitle title="References" />
            <div className="space-y-3 font-sans text-[13px]">
              {references.map((ref, index) => (
                <div key={ref.id || index}>
                  {ref.availableOnRequest ? (
                    <div className="italic text-gray-600">Available upon request</div>
                  ) : (
                    <>
                      <div className="font-bold text-gray-900">{ref.name}</div>
                      <div className="text-gray-700">{ref.title}{ref.company ? `, ${ref.company}` : ''}</div>
                      <div className="text-gray-600 text-xs mt-0.5">
                        {ref.email && <span>{ref.email}</span>}
                        {ref.email && ref.phone && <span className="mx-2">•</span>}
                        {ref.phone && <span>{ref.phone}</span>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Check empty state */}
      {!summary.summary && workExperience.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="text-center text-gray-400 mt-20 italic font-sans no-print">
          Fill out the form on the left to build your resume.
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary/20 pb-1 mb-3 font-sans">
      {title}
    </h3>
  );
}

// Icons
function MailIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>; }
function PhoneIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function MapPinIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>; }
function LinkIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>; }
function LinkedinIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>; }
function GithubIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>; }