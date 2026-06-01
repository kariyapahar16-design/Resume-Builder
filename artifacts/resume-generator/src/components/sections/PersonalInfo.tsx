import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema, PersonalInfo } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
  Camera, Upload, X, User, Mail, Phone, MapPin,
  Globe, Linkedin, Github, Link2,
} from "lucide-react";

interface Props {
  data: PersonalInfo;
  updateData: (data: Partial<PersonalInfo>) => void;
  inSheet?: boolean;
}

export default function PersonalInfoSection({ data, updateData, inSheet = false }: Props) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: data,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(data.profilePhoto || "");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateData(value as Partial<PersonalInfo>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  const handleFileChange = (file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      form.setValue("profilePhoto", base64);
      updateData({ profilePhoto: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview("");
    form.setValue("profilePhoto", "");
    updateData({ profilePhoto: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (inSheet) {
    return (
      <Form {...form}>
        <form className="space-y-6">

          {/* ── PHOTO UPLOAD — Sheet version (large, centered) ── */}
          <div className="flex flex-col items-center gap-4 py-2">
            {/* Large avatar */}
            <div className="relative">
              <div
                className="h-28 w-28 rounded-full overflow-hidden border-[3px] flex items-center justify-center cursor-pointer transition-all duration-300 group"
                style={{
                  borderColor: photoPreview ? "rgba(20,184,166,0.7)" : "rgba(255,255,255,0.12)",
                  background: photoPreview ? "transparent" : "rgba(255,255,255,0.04)",
                  boxShadow: photoPreview ? "0 0 30px rgba(20,184,166,0.3), 0 0 60px rgba(20,184,166,0.1)" : "none",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-white/15" />
                )}
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  <Camera className="h-6 w-6 text-white" />
                  <span className="text-[10px] text-white font-semibold">Change Photo</span>
                </div>
              </div>
              {photoPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 border-2 border-[#05090f] flex items-center justify-center hover:bg-red-400 transition-colors"
                  data-testid="button-remove-photo"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              )}
            </div>

            {/* Drag & drop zone */}
            <div
              className="w-full rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-200"
              style={{
                borderColor: isDragging ? "rgba(20,184,166,0.7)" : "rgba(255,255,255,0.1)",
                background: isDragging ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.02)",
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files?.[0] ?? null); }}
              data-testid="dropzone-photo"
            >
              <Upload className="h-4 w-4 mx-auto mb-1.5 text-primary/50" />
              <p className="text-xs font-semibold text-white/50">
                {isDragging ? "Drop to upload" : "Click or drag & drop your photo"}
              </p>
              <p className="text-[10px] text-white/25 mt-0.5">JPG, PNG, WEBP</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} data-testid="input-photo-file" />
          </div>

          {/* ── BASIC INFO ── */}
          <FieldGroup label="Basic Info" color="#14b8a6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field control={form.control} name="fullName" label="Full Name" placeholder="Jane Doe" icon={<User className="h-3.5 w-3.5" />} />
              <Field control={form.control} name="jobTitle" label="Job Title" placeholder="Senior Engineer" icon={<Link2 className="h-3.5 w-3.5" />} />
            </div>
          </FieldGroup>

          {/* ── CONTACT ── */}
          <FieldGroup label="Contact Details" color="#6366f1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field control={form.control} name="email" label="Email" placeholder="jane@example.com" type="email" icon={<Mail className="h-3.5 w-3.5" />} />
              <Field control={form.control} name="phone" label="Phone" placeholder="+1 (555) 123-4567" icon={<Phone className="h-3.5 w-3.5" />} />
              <div className="sm:col-span-2">
                <Field control={form.control} name="location" label="Location" placeholder="San Francisco, CA" icon={<MapPin className="h-3.5 w-3.5" />} />
              </div>
            </div>
          </FieldGroup>

          {/* ── ONLINE PRESENCE ── */}
          <FieldGroup label="Online Presence" color="#ec4899">
            <div className="space-y-3">
              <Field control={form.control} name="websiteUrl" label="Website / Portfolio" placeholder="https://janedoe.com" icon={<Globe className="h-3.5 w-3.5" />} />
              <Field control={form.control} name="linkedInUrl" label="LinkedIn" placeholder="https://linkedin.com/in/janedoe" icon={<Linkedin className="h-3.5 w-3.5" />} />
              <Field control={form.control} name="githubUrl" label="GitHub" placeholder="https://github.com/janedoe" icon={<Github className="h-3.5 w-3.5" />} />
            </div>
          </FieldGroup>

          {/* ── PHOTO URL fallback ── */}
          <div className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">Or paste a photo URL</p>
            <FormField control={form.control} name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/photo.jpg"
                      {...field}
                      value={field.value?.startsWith("data:") ? "" : (field.value || "")}
                      onChange={(e) => {
                        field.onChange(e);
                        setPhotoPreview(e.target.value);
                      }}
                      className="text-xs h-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </form>
      </Form>
    );
  }

  // ── Compact inline version (fallback, not used currently) ──
  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div
              className="h-16 w-16 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer group"
              style={{ borderColor: photoPreview ? "rgba(20,184,166,0.6)" : "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? <img src={photoPreview} alt="" className="h-full w-full object-cover" /> : <User className="h-7 w-7 text-white/20" />}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
            {photoPreview && (
              <button type="button" onClick={handleRemovePhoto}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-[#080e1a] flex items-center justify-center">
                <X className="h-2.5 w-2.5 text-white" />
              </button>
            )}
          </div>
          <div
            className="flex-1 rounded-lg border-2 border-dashed p-3 text-center cursor-pointer"
            style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files?.[0] ?? null); }}
          >
            <Upload className="h-4 w-4 mx-auto mb-1 text-primary/60" />
            <p className="text-xs text-white/50">Click or drag photo</p>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "fullName" as const, label: "Full Name", placeholder: "Jane Doe" },
            { name: "jobTitle" as const, label: "Job Title", placeholder: "Engineer" },
            { name: "email" as const, label: "Email", placeholder: "jane@example.com" },
            { name: "phone" as const, label: "Phone", placeholder: "+1 555 123" },
          ].map(({ name, label, placeholder }) => (
            <FormField key={name} control={form.control} name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl><Input placeholder={placeholder} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          ))}
          <div className="col-span-2">
            <FormField control={form.control} name="location"
              render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="San Francisco, CA" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
          </div>
        </div>
      </form>
    </Form>
  );
}

/* ── Small helper components ── */

function FieldGroup({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1" style={{ background: `${color}30` }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `${color}90` }}>
          {label}
        </span>
        <div className="h-px flex-1" style={{ background: `${color}30` }} />
      </div>
      {children}
    </div>
  );
}

function Field({
  control, name, label, placeholder, type = "text", icon,
}: {
  control: ReturnType<typeof useForm<PersonalInfo>>["control"];
  name: keyof PersonalInfo;
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-semibold text-white/50">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none">
                  {icon}
                </span>
              )}
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
                className={icon ? "pl-8" : ""}
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
