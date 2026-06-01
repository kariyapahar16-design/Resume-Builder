import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProjectSchema, Project } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(ProjectSchema) });

interface Props {
  data: Project[];
  updateData: (data: Project[]) => void;
}

export default function ProjectsSection({ data, updateData }: Props) {
  const form = useForm<{ items: Project[] }>({
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
        updateData(value.items as Project[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  const handleAddTech = (index: number) => {
    const currentTech = form.getValues(`items.${index}.techStack`) || [];
    form.setValue(`items.${index}.techStack`, [...currentTech, ""]);
  };

  const handleRemoveTech = (itemIndex: number, techIndex: number) => {
    const currentTech = form.getValues(`items.${index}.techStack`) || [];
    const newTech = [...currentTech];
    newTech.splice(techIndex, 1);
    form.setValue(`items.${itemIndex}.techStack`, newTech);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-sidebar-border rounded-lg bg-sidebar/50 relative space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-sidebar-foreground/80">Project #{index + 1}</h4>
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
                name={`items.${index}.name`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce Platform" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.liveUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.githubUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Built a full-stack e-commerce platform using..." 
                        className="resize-y"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 pt-2">
              <FormLabel>Tech Stack</FormLabel>
              <div className="flex flex-wrap gap-2">
                {form.watch(`items.${index}.techStack`)?.map((_, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-1">
                    <FormField
                      control={form.control}
                      name={`items.${index}.techStack.${techIndex}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="React" className="h-8 w-24 text-xs" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveTech(index, techIndex)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs border-dashed"
                  onClick={() => handleAddTech(index)}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Tech
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            name: "", 
            description: "", 
            techStack: [], 
            liveUrl: "", 
            githubUrl: "" 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </form>
    </Form>
  );
}
