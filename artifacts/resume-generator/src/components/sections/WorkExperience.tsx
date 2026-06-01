import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WorkExperienceSchema, WorkExperience } from "@/types/resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useEffect } from "react";

const FormSchema = z.object({ items: z.array(WorkExperienceSchema) });

interface Props {
  data: WorkExperience[];
  updateData: (data: WorkExperience[]) => void;
}

export default function WorkExperienceSection({ data, updateData }: Props) {
  const form = useForm<{ items: WorkExperience[] }>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: data },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.items) {
        updateData(value.items as WorkExperience[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  const handleAddBullet = (index: number) => {
    const currentBullets = form.getValues(`items.${index}.bullets`) || [];
    form.setValue(`items.${index}.bullets`, [...currentBullets, ""]);
  };

  const handleRemoveBullet = (itemIndex: number, bulletIndex: number) => {
    const currentBullets = form.getValues(`items.${index}.bullets`) || [];
    const newBullets = [...currentBullets];
    newBullets.splice(bulletIndex, 1);
    form.setValue(`items.${itemIndex}.bullets`, newBullets);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-sidebar-border rounded-lg bg-sidebar/50 relative space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-sidebar-foreground/80">Experience #{index + 1}</h4>
              <div className="flex items-center gap-1">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`items.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan 2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name={`items.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Present" 
                          {...field} 
                          disabled={form.watch(`items.${index}.current`)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md pt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`items.${index}.location`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, NY (Remote)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 pt-2">
              <FormLabel>Achievements (Bullet Points)</FormLabel>
              {form.watch(`items.${index}.bullets`)?.map((_, bulletIndex) => (
                <div key={bulletIndex} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.bullets.${bulletIndex}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea 
                            placeholder="Spearheaded the migration to React 18, improving render times by 30%..." 
                            className="min-h-[60px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive mt-1"
                    onClick={() => handleRemoveBullet(index, bulletIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="w-full text-xs mt-2 border-dashed"
                onClick={() => handleAddBullet(index)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Bullet Point
              </Button>
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="secondary" 
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => append({ 
            id: crypto.randomUUID(), 
            company: "", 
            jobTitle: "", 
            startDate: "", 
            endDate: "", 
            current: false, 
            location: "", 
            bullets: [""] 
          })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Work Experience
        </Button>
      </form>
    </Form>
  );
}
