import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EducationSchema, Education } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(EducationSchema) });

interface Props {
  data: Education[];
  updateData: (data: Education[]) => void;
}

export default function EducationSection({ data, updateData }: Props) {
  const form = useForm<{ items: Education[] }>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: data },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.items) {
        updateData(value.items as Education[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-sidebar-border rounded-lg bg-sidebar/50 relative space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-sidebar-foreground/80">Education #{index + 1}</h4>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`items.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University of Example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.fieldOfStudy`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.graduationYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year / Date</FormLabel>
                    <FormControl>
                      <Input placeholder="May 2022" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.gpa`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPA (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="3.8 / 4.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.achievements`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Honors / Achievements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Dean's List, Cum Laude, President of Computer Science Club" 
                        className="resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            institution: "", 
            degree: "", 
            fieldOfStudy: "", 
            graduationYear: "", 
            gpa: "", 
            achievements: "" 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </form>
    </Form>
  );
}
