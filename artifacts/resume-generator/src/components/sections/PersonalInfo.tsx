import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema, PersonalInfo } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Camera, Upload, X, User } from "lucide-react";

interface Props {
  data: PersonalInfo;
  updateData: (data: Partial<PersonalInfo>) => void;
}

export default function PersonalInfoSection({ data, updateData }: Props) {
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
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      form.setValue("profilePhoto", base64);
      updateData({ profilePhoto: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview("");
    form.setValue("profilePhoto", "");
    updateData({ profilePhoto: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Form {...form}>
      <form className="space-y-5">

        {/* ── PHOTO UPLOAD ── */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Profile Photo
          </label>

          <div className="flex items-start gap-4">
            {/* Photo circle preview */}
            <div className="relative shrink-0">
              <div
                className="h-20 w-20 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer transition-all duration-200 group"
                style={{
                  borderColor: photoPreview ? "rgba(20,184,166,0.6)" : "rgba(255,255,255,0.1)",
                  background: photoPreview ? "transparent" : "rgba(255,255,255,0.04)",
                  boxShadow: photoPreview ? "0 0 20px rgba(20,184,166,0.25)" : "none",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-white/20" />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
              {/* Remove button */}
              {photoPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-[#080e1a] flex items-center justify-center hover:bg-red-400 transition-colors"
                  data-testid="button-remove-photo"
                >
                  <X className="h-2.5 w-2.5 text-white" />
                </button>
              )}
            </div>

            {/* Drag & drop zone */}
            <div
              className="flex-1 rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-200"
              style={{
                borderColor: isDragging ? "rgba(20,184,166,0.7)" : "rgba(255,255,255,0.1)",
                background: isDragging ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.02)",
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              data-testid="dropzone-photo"
            >
              <Upload className="h-5 w-5 mx-auto mb-2 text-primary/60" />
              <p className="text-xs font-semibold text-white/60">
                {isDragging ? "Drop to upload" : "Click or drag photo here"}
              </p>
              <p className="text-[10px] text-white/30 mt-0.5">JPG, PNG, WEBP — max 5MB</p>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
            data-testid="input-photo-file"
          />

          {/* URL fallback */}
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-white/40 font-normal">Or paste image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    {...field}
                    value={field.value || ""}
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

        {/* ── REST OF FIELDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl><Input placeholder="Senior Software Engineer" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="location"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Location</FormLabel>
                <FormControl><Input placeholder="San Francisco, CA" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website / Portfolio</FormLabel>
                <FormControl><Input placeholder="https://janedoe.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="linkedInUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl><Input placeholder="https://linkedin.com/in/janedoe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="githubUrl"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>GitHub URL</FormLabel>
                <FormControl><Input placeholder="https://github.com/janedoe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
